import React from 'react';
import fetch from 'isomorphic-unfetch';

import { initStore } from './store';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  if (isServer) {
    return initStore(initialState);
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initStore(initialState);
  }

  return window[__NEXT_REDUX_STORE__];
}

async function getUserInfo(appContext) {
  const baseUrl = `${appContext.ctx.req.protocol}://${appContext.ctx.req.get(
    'Host'
  )}`;
  const resp = await fetch(`${baseUrl}/api/user/me`, {
    credentials: 'include',
    headers: { cookie: appContext.ctx.req.headers.cookie }
  });
  const json = await resp.json();
  console.log(json.data);
  return {
    auth: {
      user: {
        ...json.data.user
      }
    }
  };
}

export default App => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      let reduxStore = getOrCreateStore();
      if (isServer) {
        if (appContext.ctx.req.headers.cookie) {
          const userStore = await getUserInfo(appContext);
          reduxStore = getOrCreateStore(userStore);
        }
      }
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps.call(App, appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
