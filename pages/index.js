import Head from 'next/head';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import React, { Fragment } from 'react';

import ErrorPage from './_error';
import ActionButton from '../frontend/shared/ActionButton';

const loginButton = {
  width: '100%',
  maxWidth: '200px',
  backgroundColor: '#06b4fe',
  color: '#fff',
  marginBottom: '20px',
  cursor: 'pointer'
};

class Index extends React.Component {
  static async getInitialProps({ req, reduxStore }) {
    const isServer = !!req;
    if (!isServer) {
      const isAuth = !!reduxStore.getState().auth.expires;
      if (isAuth) {
        Router.push('/recipes');
      } else {
        return {};
      }
    }

    return {};
  }

  navigateTo = path => () => {
    const { router } = this.props;
    router.push(path);
  };

  componentDidMount() {
    const { router } = this.props;
    router.prefetch('/auth/login');
    router.prefetch('/auth/register');
  }

  render() {
    const { error } = this.props;

    if (error) {
      return <ErrorPage statusCode={error.status} />;
    }

    return (
      <Fragment>
        <Head>
          <title>Home | React Recipes</title>
        </Head>
        <div className="landing">
          <section className="title-action">
            <h3 className="title">React Recipes</h3>
            <h5 className="subtitle">
              Share your recipes. Get inspired.
              <br /> Cook!
            </h5>
            <ActionButton
              customStyle={loginButton}
              handleClick={this.navigateTo('/auth/register')}
            >
              Register
            </ActionButton>
          </section>
        </div>
        <style jsx>{`
          .landing {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .title-action {
            width: 90%;
            margin: 0 auto;
            padding: 30px 16px;
            text-align: center;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            border-radius: 8px;
          }

          .title {
            font-size: 48px;
            margin: 0px;
            padding: 15px 0;
            color: #26335e;
            font-weight: 900;
          }

          .subtitle {
            color: #777e8e;
            line-height: 1.5;
            margin: 8px 0 40px 0;
            font-size: 18px;
          }

          .explore {
            background: #10aeb2;
            height: 60px;
            bottom: 0;
            // transform: translateY(40px);
            transition: transform 0.3s 1s ease-in;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          @keyframes;
        `}</style>
      </Fragment>
    );
  }
}

export default withRouter(Index);
