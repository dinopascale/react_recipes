import App, { Container } from 'next/app';
import React from 'react';

import withReduxStore from '../store/withReduxStore';
import { Provider } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faTrash,
  faSave,
  faBan,
  faEdit,
  faEllipsisV,
  faStar,
  faLongArrowAltUp,
  faLongArrowAltDown,
  faCaretDown,
  faComment,
  faExclamation,
  faCheckCircle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

import Layout from '../frontend/hoc/Layout';

library.add(
  faPlus,
  faTrash,
  faSave,
  faBan,
  faEdit,
  faEllipsisV,
  faStar,
  faLongArrowAltUp,
  faLongArrowAltDown,
  faCaretDown,
  faComment,
  faExclamation,
  faCheckCircle,
  faSpinner
);

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
