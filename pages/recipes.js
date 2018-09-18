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

class Recipes extends React.Component {
  static async getInitialProps({ req }) {
    try {
      if (req) {
        try {
          const { db } = req;

          const resultsUnsorted = await db.models['Recipe'].findByAvgRate();

          return {
            recipes: resultsUnsorted
              .sort((a, b) => b.avgRate - a.avgRate)
              .slice(0, 6)
          };
        } catch (e) {
          console.log(e);
          return e;
        }
      }

      const response = await fetch(`/api/recipes`);

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
    sortBy: 'Most Popular'
  };

  componentDidMount() {
    // if (window) {
    //   console.log(this.container);
    //   window.addEventListener('scroll', () => {
    //     console.log(
    //       window.innerHeight,
    //       window.pageYOffset,
    //       document.body.offsetHeight,
    //       this.container.innerHeight,
    //       this.container.pageYOffset
    //     );
    //     if (
    //       window.innerHeight + window.pageYOffset >=
    //       document.body.offsetHeight
    //     ) {
    //       console.log('bottom');
    //     }
    //   });
    // }
    this.props.router.prefetch('/auth/register');
  }

  componentWillUnmount() {
    // if (window) window.removeEventListener('scroll');
  }

  getRecipesByDate = async () => {
    const { callApi, errorModal } = this.props;
    await callApi(
      '/api/recipes/recent',
      null,
      json => {
        this.setState({
          recipesList: json.results,
          sortBy: 'Most Recent'
        });
      },
      error => {
        errorModal();
      }
    );
  };

  getRecipesByRate = async () => {
    const { callApi, errorModal } = this.props;
    await callApi(
      '/api/recipes',
      null,
      json => {
        this.setState({
          recipesList: json.results,
          sortBy: 'Most Popular'
        });
      },
      error => {
        errorModal();
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
            this.container = element;
          }}
        >
          {user ? this.renderGreetToUser() : this.renderCallToAction()}
          <hr className="divider" />
          <RecipesList
            recipes={this.state.recipesList || this.props.recipes}
            byDate={this.getRecipesByDate}
            byRate={this.getRecipesByRate}
            sortBy={this.state.sortBy}
          />
          <style jsx>{`
            .recipes-container {
              width: 100%;
              min-height: 100%;
              padding: 90px 20px 40px 20px;
              overflow-y: scroll;
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
