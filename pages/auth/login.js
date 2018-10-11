import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';

import {
  callApi,
  successLogin,
  failLogin,
  refreshSession
} from '../../store/actions';
import LoginForm from '../../frontend/component/LoginForm';
import Spinner from '../../frontend/component/Spinner';

class Login extends Component {
  static async getInitialProps(props) {
    if (props.req) {
      const { db } = props.req;
      const schema = db.models['User'].getSchema('email', 'password');
      return { schema };
    }
    if (props.reduxStore.getState().auth.user) {
      Router.push('/recipes');
    }
  }

  async componentDidMount() {
    const { router, callApi, isAuth } = this.props;
    router.prefetch('/recipes');

    const endpoint = '/api/s/user';
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filter: 'auth' })
    };

    await callApi(
      endpoint,
      options,
      json =>
        this.setState({
          schema: json.data.schema,
          isLoading: false
        }),
      error => {
        this.setState({
          isLoading: false
        });
      }
    );
  }

  state = {
    schema: [],
    isLoading: true
  };

  loggedInAndPushToRecipes = json => {
    const { loginSuccess, router, startIntervalToRefresh } = this.props;
    loginSuccess(json.data.userInfo, json.meta.sessionExpires);
    startIntervalToRefresh(json.meta.sessionExpires);
    router.push('/recipes');
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Fragment>
        <Head>
          <title>Login | React Recipes</title>
        </Head>
        <div className="auth">
          <div className="form">
            <h3 className="form-auth-title">Login</h3>
            <p className="form-auth-subtitle">
              or{' '}
              <Link prefetch href="/auth/register">
                <span className="auth-link">create a new account</span>
              </Link>
            </p>
            <div className="container">
              {!isLoading ? (
                <LoginForm
                  schema={this.props.schema || this.state.schema}
                  submitSucceeded={this.loggedInAndPushToRecipes}
                  submitFailed={this.props.loginFail}
                />
              ) : (
                <Spinner type="contain" />
              )}
            </div>
          </div>
          <style jsx>{`
            .auth {
              height: 100vh;
              display: flex;
              flex-flow: column;
              align-items: center;
              justify-content: center;
            }

            .form-auth-title {
              margin-top: 0;
              margin-bottom: 5px;
              color: #26335e;
              font-weight: 900;
            }

            .form-auth-subtitle {
              margin-top: 0;
              margin-bottom: 10px;
              font-size: 14px;
            }

            .auth-link {
              margin-bottom: 20px;
              color: #10aeb2;
              font-size: 14px;
            }

            .form {
              width: 90%;
              margin-top: 50px;
              min-height: 236px;
              background: #fff;
              border-radius: 4px;
              padding: 20px 20px;
            }

            .container {
              position: relative;
              min-height: 200px;
            }

            .toggle-form {
              margin-top: 40px;
              background: rgb(236, 242, 132);
              border-radius: 3px;
              padding: 15px 60px;
              width: 90%;
              text-align: center;
              font-weight: bold;
            }
          `}</style>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: !!state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startIntervalToRefresh: expires => dispatch(refreshSession(expires)),
    loginSuccess: (userInfo, expires) =>
      dispatch(successLogin(userInfo, expires)),
    loginFail: error => dispatch(failLogin(error)),
    callApi: (endpoint, options, onSuccess, onFail) =>
      dispatch(callApi(endpoint, options, onSuccess, onFail))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
