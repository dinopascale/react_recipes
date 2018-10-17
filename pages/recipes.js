import React, { Fragment } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import ErrorPage from './_error';

import { createErrorMessage, callApiP } from '../store/actions';

import ActionButton from '../frontend/shared/ActionButton';
import GreetUser from '../frontend/component/GreetUser';
import RecipesList from '../frontend/component/RecipesList';

const styleButton = {
  backgroundColor: '#06b4fe',
  color: '#fff',
  marginBottom: '20px',
  padding: '10px 40px',
  cursor: 'pointer',
  boxShadow:
    '0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)'
};

const marginTop = '90px';

class Recipes extends React.Component {
  static async getInitialProps({ req }) {
    try {
      if (req) {
        const { db } = req;

        const resultsUnsorted = await db.models[
          'Recipe'
        ].findAndSortByAvgRate();

        return {
          recipes: resultsUnsorted
            .sort((a, b) => b.avgRate - a.avgRate)
            .slice(0, 6),
          total: resultsUnsorted.length,
          error: null
        };
      }

      const response = await fetch(`/api/recipes?page=1`);

      if (response.status !== 200) {
        const e = new Error(res.statusText);
        e.status = response.status;
        throw e;
      }

      const json = await response.json();
      return {
        total: json.meta.total,
        recipes: json.data.results,
        error: null
      };
    } catch (e) {
      return { error: e };
    }
  }

  state = {
    recipesList: this.props.recipes || [],
    sortBy: 'Most Popular',
    filterBy: 'Omnivore',
    page: 1,
    total: this.props.total
  };

  _container = null;

  componentDidMount() {
    if (window) {
      window.addEventListener('scroll', this.infiniteScroll, false);
    }
    this.props.router.prefetch('/auth/register');
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('scroll', this.infiniteScroll, false);
    }
  }

  infiniteScroll = () => {
    const rectBoundaries = this._container.getBoundingClientRect();
    const endOfPage =
      rectBoundaries.bottom.toFixed(0) >= window.innerHeight - 40 &&
      rectBoundaries.bottom.toFixed(0) <= window.innerHeight;

    if (!endOfPage) {
      return false;
    }

    if (this.state.sortBy === 'Most Popular') {
      return this.getRecipes(true, 'Most Popular', this.state.filterBy);
    } else {
      return this.getRecipes(true, 'Most Recent', this.state.filterBy);
    }
  };

  getRecipes = async (
    fromScroll = false,
    sort = 'Most Popular',
    tag = false
  ) => {
    const { callApi, errorModal, loading } = this.props;
    const { page, total, recipesList } = this.state;

    if ((recipesList.length >= total && fromScroll) || loading) {
      return false;
    }

    const endpoint =
      sort === 'Most Popular'
        ? `/api/recipes?page=${fromScroll ? page + 1 : 1}${
            tag ? '&tag=' + tag : ''
          }`
        : `/api/recipes/recent?page=${fromScroll ? page + 1 : 1}${
            tag ? '&tag=' + tag : ''
          }`;

    try {
      const json = await callApi(endpoint, null);
      const otherRecipes = json.data.results;
      this.setState(prevState => ({
        recipesList: fromScroll
          ? [...prevState.recipesList, ...otherRecipes]
          : otherRecipes,
        sortBy: sort === 'Most Popular' ? 'Most Popular' : 'Most Recent',
        filterBy: tag ? tag : prevState.tag,
        page: fromScroll ? prevState.page + 1 : 1,
        total: json.meta.total
      }));
    } catch (e) {
      errorModal(e);
    }
  };

  renderCallToAction = () => {
    return (
      <div className="invite-container">
        <h3 className="title">Feel Inspired?</h3>
        <p className="body-one subtitle">
          Why not register and post your awesome recipe?
        </p>
        <ActionButton
          customStyle={styleButton}
          handleClick={() => this.props.router.push('/auth/register')}
        >
          Enter
        </ActionButton>
        <style jsx>{`
          .invite-container {
            width: 100%;
          }

          .title,
          .subtitle {
            margin-top: 0;
          }

          .title {
            margin-bottom: 20px;
            color: #26335e;
            font-weight: 900;
          }

          .subtitle {
            margin-bottom: 30px;
            color: #777e8e;
            line-height: 1.5;
          }
        `}</style>
      </div>
    );
  };

  renderGreetToUser = () => {
    const { user } = this.props;
    return <GreetUser user={user} />;
  };

  render() {
    const { user, error, recipes } = this.props;
    const { recipesList, total } = this.state;

    if (error) {
      return <ErrorPage statusCode={error.status} />;
    }

    return (
      <Fragment>
        <Head>
          <title>Recipes | React Recipes</title>
        </Head>
        <div
          className="recipes-container"
          ref={element => {
            this._container = element;
          }}
        >
          {user ? this.renderGreetToUser() : this.renderCallToAction()}
          <hr className="divider" />
          <RecipesList
            recipes={this.state.recipesList || this.props.recipes}
            isEnd={recipesList.length === total}
            getRecipes={this.getRecipes}
            sortBy={this.state.sortBy}
            filterBy={this.state.filterBy}
          />
          <style jsx>{`
            .recipes-container {
              width: 90%;
              max-width: 900px;
              margin: ${marginTop} auto 30px auto;
              border-radius: 8px;
              min-height: 100%;
              padding: 30px 16px 0px 16px;
              background: #fff;
            }

            .divider {
              border: 1px solid;
              color: #777e8e;
              margin: 20px 0 20px 0;
            }

            @media (min-width: 700px) {
              .recipes-container {
                padding: 30px 36px 0px 36px;
              }
            }
          `}</style>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    callApi: (endpoint, options) => dispatch(callApiP(endpoint, options)),
    errorModal: error => dispatch(createErrorMessage(error))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Recipes));
