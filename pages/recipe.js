import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import InfoRow from '../frontend/component/InfoRow';
import IngredientList from '../frontend/component/IngredientList';

const Recipe = props => (
  <Fragment>
    <Head>
      <title>{props.recipe.name || 'Fantastic Recipe'}</title>
    </Head>
    <div className="recipe-image--container">
      <img
        src={props.recipe.img}
        alt={props.recipe.name}
        className="recipe-image"
      />
    </div>
    <p>Is Author: {props.recipe.isAuthor ? 'Yes' : 'Nope'}</p>
    <h1 className="recipe-title">{props.recipe.name}</h1>
    <h5 className="recipe-author">by {props.recipe._creator.username}</h5>
    <InfoRow infos={props.infos} />
    <IngredientList
      ingredients={props.recipe.ingredients}
      authInfo={props.isAuthenticated}
      isEditable={props.recipe.isAuthor}
      recipeId={props.recipe._id}
    />
    <style jsx>{`
      .recipe-image--container {
        margin-top: 30px;
      }

      .recipe-image {
        width: 100%;
        max-width: 600px;
      }

      .recipe-title {
        font-family: 'Fredoka One', cursive;
        font-size: 28px;
        text-align: center;
        margin-bottom: 16px;
        color: #ef476f;
      }

      .recipe-author {
        margin-top: 0;
        color: rgba(0, 0, 0, 0.3);
        text-align: center;
      }
    `}</style>
  </Fragment>
);

Recipe.getInitialProps = async props => {
  const baseUrl = props.req
    ? `${props.req.protocol}://${props.req.get('Host')}`
    : '';

  const res = await fetch(`${baseUrl}/api/recipe/${props.query.id}`, {
    method: 'GET',
    credentials: 'include',
    headers: props.req ? { cookie: props.req.headers.cookie } : undefined
  });

  const data = await res.json();

  //   const resp = await axios.get(
  //     `${baseUrl}/api/recipe/${props.query.id}`,
  //     { headers: props.req ? { cookie: props.req.headers.cookie } : undefined },
  //     {
  //       withCredentials: true
  //     }
  //   );
  //   const data = resp.data;

  if (!data.recipe || data.recipe.length === 0) {
    props.res.redirect('/');
  }

  const { preparationTime, cookTime, difficulty, serves } = data.recipe;
  const infos = {
    'Preapartion Time': preparationTime + ' min',
    'Cook Time': cookTime + ' min',
    Difficulty: difficulty,
    Serves: serves
  };

  console.log(data.recipe.ingredients);

  return {
    recipe: data.recipe,
    infos
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth
  };
};

export default connect(mapStateToProps)(withRouter(Recipe));
