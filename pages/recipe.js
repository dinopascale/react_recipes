import React, { Fragment } from 'react';
import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import ErrorPage from './_error';
import { connect } from 'react-redux';

import Editable from '../frontend/shared/Editable';
import RateRecipe from '../frontend/component/RateRecipe';
import ThreadList from '../frontend/component/ThreadList';

class Recipe extends React.Component {
  static async getInitialProps(props) {
    try {
      //SSR - THROUGH MONGOOSE
      if (props.req) {
        const _id = props.res.locals.issuerId || null;
        const recipeId = props.query.id;
        const { db } = props.req;
        let userRateValue = false;

        const recipe = await db.models['Recipe'].findByIdAndGetAuthor(recipeId);

        const rates = await db.models['RecipeRate']
          .find({ recipeId: recipeId })
          .select('value userId');
        const rateValue = rates.reduce((sum, rate) => sum + rate.value, 0);
        const rateCount = rates.length;

        const isAuthor = _id && _id.equals(recipe._creator._id);

        if (!isAuthor && rates.length > 0 && _id) {
          const userRate = rates.find(rate => _id.equals(rate.userId));
          userRateValue = userRate ? userRate.value : false;
        }

        const difficultyObject = {
          value: recipe.difficulty,
          options: ['easy', 'medium', 'hard']
        };

        return {
          recipe: {
            ...recipe,
            difficulty: difficultyObject,
            isAuthor,
            rateValue,
            rateCount,
            ratedBefore: !!userRateValue,
            userRateValue
          }
        };
      }

      //CSR - FETCH THROUGH API
      const response = await fetch(`/api/recipe/${props.query.id}`, {
        method: 'GET',
        credentials: 'include',
        headers: props.req ? { cookie: props.req.headers.cookie } : undefined
      });

      if (response.status !== 200) {
        const e = new Error(response.statusText);
        e.status = response.status;
        throw e;
      }

      const data = await response.json();

      if (!data.recipe || data.recipe.length === 0) {
        props.res.redirect('/');
      }

      return {
        recipe: data.recipe
      };
    } catch (e) {
      return { error: e };
    }
  }

  render() {
    const { error, recipe } = this.props;
    if (error) {
      return <ErrorPage statusCode={error.status} />;
    }

    const endpoint = recipe ? `/api/recipe/${this.props.recipe._id}` : null;

    return (
      <Fragment>
        <Head>
          <title>{this.props.recipe.name || 'Fantastic Recipe'}</title>
        </Head>
        <Editable
          data={this.props.recipe.img}
          name="img"
          type="img"
          bgImage
          auth={this.props.recipe.isAuthor}
          endpoint={endpoint}
        />
        <Editable
          data={this.props.recipe.name}
          name="name"
          type="input"
          style={{
            fontSize: '32px',
            color: '#10aeb2',
            textAlign: 'center',
            fontFamily: '"Fredoka One", cursive',
            marginTop: '15px'
          }}
          auth={this.props.recipe.isAuthor}
          endpoint={endpoint}
        />
        <h5 className="recipe-author">
          by {this.props.recipe._creator.username}
        </h5>
        <Editable
          data={this.props.recipe.cookTime}
          name="cookTime"
          type="input"
          withLabel
          auth={this.props.recipe.isAuthor}
          endpoint={endpoint}
        />
        <Editable
          data={this.props.recipe.preparationTime}
          name="preparationTime"
          type="input"
          withLabel
          auth={this.props.recipe.isAuthor}
          endpoint={endpoint}
        />
        <Editable
          data={this.props.recipe.difficulty.value}
          name="difficulty"
          type="checkbox"
          options={this.props.recipe.difficulty.options}
          withLabel
          auth={this.props.recipe.isAuthor}
          endpoint={endpoint}
        />
        <Editable
          data={this.props.recipe.serves}
          name="serves"
          type="input"
          withLabel
          auth={this.props.recipe.isAuthor}
          endpoint={endpoint}
        />
        <Editable
          data={this.props.recipe.ingredients}
          name="ingredients"
          type="input"
          title="Ingredients"
          isList
          auth={this.props.recipe.isAuthor}
          endpoint={endpoint}
        />
        <Editable
          data={this.props.recipe.directions}
          name="directions"
          type="textarea"
          title="Directions"
          auth={this.props.recipe.isAuthor}
          endpoint={endpoint}
        />
        <RateRecipe
          ratedBefore={this.props.recipe.ratedBefore}
          userRate={this.props.recipe.userRateValue}
          rateValue={this.props.recipe.rateValue}
          rateCount={this.props.recipe.rateCount}
          isAuth={this.props.isAuthenticated.user}
          isAuthor={this.props.recipe.isAuthor}
          id={this.props.recipe._id}
        />
        <ThreadList
          apiId={this.props.recipe._id}
          baseURL="/api/thread"
          type="threads"
          isAuth={this.props.isAuthenticated.user}
        />
        <style jsx>{`
          .recipe-image--container {
            margin-top: 30px;
          }

          .recipe-image {
            width: 100%;
            max-width: 600px;
          }

          .recipe-section-title {
            padding: 0 15px;
            margin-bottom: 10px;
          }

          .recipe-author {
            margin-top: 0;
            color: rgba(0, 0, 0, 0.3);
            text-align: center;
          }
        `}</style>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth
  };
};

export default connect(mapStateToProps)(withRouter(Recipe));
