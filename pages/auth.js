import { Fragment } from 'react';
import Head from 'next/head';

import LoginForm from '../frontend/component/LoginForm';

const Auth = props => (
  <Fragment>
    <Head>
      <title>Auth</title>
    </Head>
    <h1>Login</h1>
    <LoginForm />
  </Fragment>
);

export default Auth;
