import React, { Fragment } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from './_error';
import { connect } from 'react-redux';

import RateRecipe from '../frontend/component/RateRecipe';
import ThreadList from '../frontend/component/ThreadList';
import SingleRecipe from '../frontend/component/SingleRecipe';
import FloatingButton from '../frontend/shared/FloatingButton';

import { addItemToEdit, createErrorMessage, callApi } from '../store/actions';
import IntoView from '../frontend/hoc/IntoView';
import apiEndpoints from '../frontend/utils/apiEndpoints';
import ConfirmationModal from '../frontend/component/ConfirmationModal';

class Recipe extends React.Component {
  static async getInitialProps({ req, res, query }) {
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

        if (!isPublic) {
          res.writeHead(302, {
            Location: '/'
          });
          res.end();
        }

        const isAuthor = !!(_id && _id.equals(recipe._creator._id));

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

  state = {
    confirmModalisOpen: false
  };

  componentDidMount() {
    const { isAuthor, router } = this.props;
    if (isAuthor) {
      router.prefetch('/edit');
    }
  }

  goToEditMode = event => {
    event.preventDefault();
    const { router, recipe, addRecipeToEdit } = this.props;
    router.push(
      `/edit?id=${recipe._id}&isRecipe=true`,
      `/edit_recipe/${recipe._id}`
    );
    addRecipeToEdit(recipe);
  };

  closeConfirmModal = () => {
    this.setState({
      confirmModalisOpen: false
    });
  };

  openConfirmModal = () => {
    this.setState({
      confirmModalisOpen: true
    });
  };

  deleteRecipe = async () => {
    const { endpoint, options } = apiEndpoints.deleteRecipe;
    const { recipe, router, callApi, onError } = this.props;

    const dynamicEndpoint = endpoint + `/${recipe._id}`;

    await callApi(
      dynamicEndpoint,
      options,
      () => router.push('/recipes'),
      error => {
        onError({ status: error.status, message: error.message });
      }
    );
  };

  render() {
    const { error, recipe, router, isAuthor } = this.props;
    const { confirmModalisOpen } = this.state;

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
          {isAuthor ? (
            <Fragment>
              {confirmModalisOpen ? (
                <ConfirmationModal
                  close={this.closeConfirmModal}
                  title="Discard Recipe?"
                  message="This action is irreversible and your recipe we'll be lost forever"
                  onCancel={this.closeConfirmModal}
                  onConfirm={this.deleteRecipe}
                />
              ) : null}
              <FloatingButton
                icon="trash"
                isColumn
                action={this.openConfirmModal}
              />
              <FloatingButton icon="edit" action={this.goToEditMode} />
            </Fragment>
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
              {/* <ThreadList
                apiId={this.props.recipe._id}
                baseURL="/api/thread"
                type="threads"
                isAuth={this.props.isAuthenticated.user}
              /> */}
            </Fragment>
          ) : null}
          <style jsx>{`
            .recipe-c {
              height: ${confirmModalisOpen ? '100vh' : 'auto'};
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
    isAuthenticated: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRecipeToEdit: recipe => dispatch(addItemToEdit(recipe)),
    callApi: (endpoint, options, onSuccess, onFail) =>
      dispatch(callApi(endpoint, options, onSuccess, onFail)),
    onError: error => dispatch(createErrorMessage(error))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Recipe));
