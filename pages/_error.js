import React, { Fragment } from 'react';
import Head from 'next/head';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <Fragment>
        <Head>
          <title>Error</title>
        </Head>
        <div className="error-page">
          <div className="error-img" />
          <h1 className="error-title">Ops!</h1>
          <p className="error-message">
            {this.props.statusCode
              ? `An error ${
                  this.props.statusCode
                } occurred on server. Return to the home page and retry later`
              : 'An error occurred on client. Return to the home page and retry later'}
          </p>
          <style jsx>{`
            .error-page {
              width: 100vw;
              max-width: 800px;
              height: 100vh;
              padding: 40px 20px;
              display: flex;
              flex-flow: column;
              justify-content: center;
              align-items: center;
              background: #10aeb2;
            }

            .error-img {
              width: 100%;
              min-height: 150px;
              background: url('/static/crying_sushi.png') no-repeat center
                center;
              background-size: contain;
              margin-bottom: 40px;
            }

            .error-title {
              margin: 0 0 20px 0;
              text-align: center;
              font-size: 64px;
              color: #fff;
            }

            .error-message {
              margin: 0;
              font-size: 18px;
              text-align: center;
              color: #fff;
              line-height: 1.5;
            }
          `}</style>
        </div>
      </Fragment>
    );
  }
}
