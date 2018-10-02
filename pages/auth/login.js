import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';

import { callApi, successLogin, failLogin } from '../../store/actions';
import LoginForm from '../../frontend/component/LoginForm';

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
    const { loginSuccess, router } = this.props;
    loginSuccess(json.data.userInfo);
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
            <h1 className="form-auth-title">Login</h1>
            <p className="form-auth-subtitle">
              or{' '}
              <Link prefetch href="/auth/register">
                <span className="auth-link">create a new account</span>
              </Link>
            </p>
            {!isLoading ? (
              <LoginForm
                schema={this.props.schema || this.state.schema}
                submitSucceeded={this.loggedInAndPushToRecipes}
                submitFailed={this.props.loginFail}
              />
            ) : null}
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
              min-height: 236px;
              background: #fff;
              border-radius: 4px;
              padding: 40px 20px;
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
    loginSuccess: userInfo => dispatch(successLogin(userInfo)),
    loginFail: error => dispatch(failLogin(error)),
    callApi: (endpoint, options, onSuccess, onFail) =>
      dispatch(callApi(endpoint, options, onSuccess, onFail))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
