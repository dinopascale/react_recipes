import React, { Fragment } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import { callApi, createErrorMessage } from '../store/actions';

import ActionButton from '../frontend/shared/ActionButton';
import GreetUser from '../frontend/component/GreetUser';
import RecipesList from '../frontend/component/RecipesList';

const styleButton = {
  maxWidth: '300px',
  maxHeight: '36px',
  backgroundColor: '#ecf284',
  fontWeight: 'bold',
  lineHeight: '14px',
  marginBottom: '20px',
  borderRadius: '4px',
  padding: '10px 40px',
  cursor: 'pointer'
};

const marginTop = '90px';

class Recipes extends React.Component {
  static async getInitialProps({ req }) {
    try {
      if (req) {
        try {
          const { db } = req;

          const resultsUnsorted = await db.models[
            'Recipe'
          ].findAndSortByAvgRate();

          return {
            recipes: resultsUnsorted
              .sort((a, b) => b.avgRate - a.avgRate)
              .slice(0, 6),
            total: resultsUnsorted.length
          };
        } catch (e) {
          console.log(e);
          return e;
        }
      }

      const response = await fetch(`/api/recipes?page=1`);

      if (response.status !== 200) {
        const e = new Error(res.statusText);
        e.status = response.status;
        throw e;
      }
      const data = await response.json();
      return {
        recipes: data.results
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
    if (
      rectBoundaries.bottom.toFixed(0) >= window.innerHeight - 10 &&
      rectBoundaries.bottom.toFixed(0) <= window.innerHeight
    ) {
      if (this.state.sortBy === 'Most Popular') {
        this.getRecipes(true, 'Most Popular', this.state.filterBy);
      } else {
        this.getRecipes(true, 'Most Recent', this.state.filterBy);
      }
    }
  };

  getRecipes = async (
    fromScroll = false,
    sort = 'Most Popular',
    tag = false
  ) => {
    const { callApi, errorModal } = this.props;
    const { page, total, recipesList } = this.state;

    if (recipesList.length >= total && fromScroll) {
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

    await callApi(
      endpoint,
      null,
      json => {
        this.setState(prevState => ({
          recipesList: fromScroll
            ? [...prevState.recipesList, ...json.results]
            : json.results,
          sortBy: sort === 'Most Popular' ? 'Most Popular' : 'Most Recent',
          filterBy: tag ? tag : prevState.tag,
          page: fromScroll ? prevState.page + 1 : 1,
          total: json.total
        }));
      },
      error => {
        errorModal(error);
      }
    );
  };

  renderCallToAction = () => {
    return (
      <div className="invite-container">
        <h1 className="title">Feel Inspired?</h1>
        <p className="subtitle">
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
            color: #fff;
          }

          .title {
            margin-bottom: 10px;
          }

          .subtitle {
            margin-bottom: 30px;
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
    const { user } = this.props;
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
            getRecipes={this.getRecipes}
            sortBy={this.state.sortBy}
            filterBy={this.state.filterBy}
          />
          <style jsx>{`
            .recipes-container {
              width: 100%;
              min-height: 100%;
              margin-top: ${marginTop};
              padding: 0px 20px 0px 20px;
            }

            .divider {
              border: 1px solid;
              color: #fff;
              margin: 40px 0 20px 0;
            }
          `}</style>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    callApi: (endpoint, options, onSuccess, onFail) =>
      dispatch(callApi(endpoint, options, onSuccess, onFail)),
    errorModal: error => dispatch(createErrorMessage(error))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Recipes));
