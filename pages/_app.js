import App, { Container } from 'next/app';
import React from 'react';

import { refreshSession } from '../store/actions';

import withReduxStore from '../store/withReduxStore';
import { Provider } from 'react-redux';
import { PageTransition } from 'next-page-transitions';

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
  faSpinner,
  faPaperPlane,
  faUserCircle,
  faPlusCircle,
  faSignOutAlt,
  faGlobe,
  faGem,
  faClock,
  faHeart,
  faUndo,
  faUserEdit,
  faArrowLeft,
  faTimes,
  faReply,
  faCaretUp
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
  faCaretUp,
  faComment,
  faExclamation,
  faCheckCircle,
  faSpinner,
  faPaperPlane,
  faUserCircle,
  faPlusCircle,
  faSignOutAlt,
  faGlobe,
  faGem,
  faClock,
  faHeart,
  faUndo,
  faUserEdit,
  faArrowLeft,
  faTimes,
  faReply
);

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    const { reduxStore } = this.props;
    const { expires } = reduxStore.getState().auth;
    const isUser = !!expires;
    if (isUser) {
      reduxStore.dispatch(refreshSession(expires));
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Layout>
            <PageTransition timeout={300} classNames="page-transition">
              <Component {...pageProps} />
            </PageTransition>
          </Layout>
        </Provider>
        <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 300ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 300ms;
          }
        `}</style>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
