import React, { Fragment } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from './_error';
import { connect } from 'react-redux';

import RateRecipe from '../frontend/component/RateRecipe';
import ThreadSection from '../frontend/component/ThreadSection';
import SingleRecipe from '../frontend/component/SingleRecipe';

import {
  actionTypes,
  addItemToEdit,
  createErrorMessage,
  callApi,
  addRecipe,
  closeModal,
  openModal
} from '../store/actions';
import IntoView from '../frontend/hoc/IntoView';
import apiEndpoints from '../frontend/utils/apiEndpoints';
import ConfirmationModal from '../frontend/component/ConfirmationModal';

class Recipe extends React.Component {
  static async getInitialProps({ req, res, query, reduxStore }) {
    try {
      if (req) {
        const _id = res.locals.issuerId ? res.locals.issuerId._id : null;
        const { db } = req;
        const recipeId = query.id;

        //find recipe
        const queryDbResults = await db.models['Recipe']
          .find({
            _id: recipeId
          })
          .populate('_creator', 'username');
        const recipe = queryDbResults[0];

        const isPublic = recipe.sharable;

        const isAuthor = !!(_id && _id.equals(recipe._creator._id));

        if (!isPublic && !isAuthor) {
          res.writeHead(302, {
            Location: '/'
          });
          res.end();
        }

        reduxStore.dispatch(addRecipe({ ...recipe._doc, isAuthor }));

        return {
          recipe,
          isAuthor
        };
      }

      const response = await fetch(`/api/recipe/${query.id}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (response.status !== 200) {
        const e = new Error(response.statusText);
        e.status = response.status;
        throw e;
      }

      const json = await response.json();
      const { isAuthor } = json.meta;
      const { recipe } = json.data;

      if (!recipe || recipe.length === 0) {
        const e = new Error('Recipe not Found');
        e.status = 400;
        throw e;
      }

      reduxStore.dispatch(addRecipe({ ...recipe, isAuthor }));

      return {
        recipe,
        isAuthor
      };
    } catch (error) {
      return {
        error
      };
    }
  }

  componentDidMount() {
    const { isAuthor, router } = this.props;
    if (isAuthor) {
      router.prefetch('/edit');
    }
  }

  deleteRecipe = async () => {
    const { endpoint, options } = apiEndpoints.deleteRecipe;
    const { recipe, router, callApi, onError } = this.props;

    const dynamicEndpoint = endpoint + `/${recipe._id}`;

    await callApi(
      dynamicEndpoint,
      options,
      () => router.push('/recipes'),
      error => {
        console.log(error);
        onError({ status: error.status, message: error.message });
      }
    );
  };

  render() {
    const {
      error,
      recipe,
      isAuthor,
      modalIsOpen,
      closeModal,
      openModal,
      isAuthenticated
    } = this.props;

    if (error) {
      return <ErrorPage statusCode={error.status} />;
    }

    return (
      <Fragment>
        <Head>
          <title>
            {recipe.name + ' | React Recipes' ||
              'Fantastic Recipe | React Recipes'}
          </title>
        </Head>
        <div className="recipe-c">
          {modalIsOpen ? (
            <ConfirmationModal
              close={closeModal}
              title="Discard Recipe?"
              message="This action is irreversible and your recipe we'll be lost forever"
              onConfirm={this.deleteRecipe}
              onCancle={closeModal}
            />
          ) : null}
          <SingleRecipe recipe={recipe} isAuthor={isAuthor} />
          {recipe.sharable ? (
            <Fragment>
              <IntoView
                render={isVisible => (
                  <RateRecipe
                    ratedBefore={this.props.recipe.ratedBefore}
                    userRate={this.props.recipe.userRateValue}
                    rateValue={this.props.recipe.rateValue}
                    rateCount={this.props.recipe.rateCount}
                    isAuth={this.props.isAuthenticated.user}
                    isAuthor={isAuthor}
                    recipeId={recipe._id}
                    isVisible={isVisible}
                  />
                )}
              />
              <ThreadSection
                apiId={this.props.recipe._id}
                baseURL="/api/thread"
                type="threads"
                isAuth={isAuthenticated.user}
              />
            </Fragment>
          ) : null}
          <style jsx>{`
            .recipe-c {
              height: ${modalIsOpen ? '100vh' : 'auto'};
              margin-bottom: 40px;
            }
          `}</style>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth,
    modalIsOpen: state.confirmationModal.isOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRecipeToEdit: recipe => dispatch(addItemToEdit(recipe)),
    callApi: (endpoint, options, onSuccess, onFail) =>
      dispatch(callApi(endpoint, options, onSuccess, onFail)),
    onError: () =>
      dispatch({
        type: actionTypes.FAIL_DELETE_RECIPE,
        payload: 'Recipe not deleted'
      }),
    closeModal: () => dispatch(closeModal()),
    openModal: () => dispatch(openModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Recipe));
