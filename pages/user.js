import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import ErrorPage from './_error';

import apiEndpoints from '../frontend/utils/apiEndpoints';
import apiCall from '../frontend/utils/apiCall';
import SingleUser from '../frontend/component/SingleUser';
import FloatingButton from '../frontend/shared/FloatingButton';

class User extends Component {
  static async getInitialProps({ req, res, query, reduxStore }) {
    try {
      const isServer = !!req;
      let userId = null;
      let user = null;
      let error = null;
      let isMe = false;

      if (isServer) {
        const { db } = req;
        isMe = !!res.locals.issuerId;
        userId = isMe ? res.locals.issuerId : query.userId;

        const queryDbResults = await db.models['User']
          .find({ _id: userId })
          .select('avatar username bio');
        user = queryDbResults[0];

        return {
          user,
          isMe,
          error
        };
      }

      const { endpoint, options } = apiEndpoints.user;
      const userInState = reduxStore.getState().auth.user;

      isMe = query.isMe || false;
      userId = query.userId;

      await apiCall(
        `${endpoint}/${userId}`,
        options,
        json => (user = json.data.user),
        error => (error = error)
      );

      return { user, userInState, error, isMe };
    } catch (error) {
      return {
        error
      };
    }
  }

  state = {
    recipes: null,
    userComments: 0,
    userRates: 0,
    isLoading: true
  };

  checkAuth = () => {
    const { router, userInState, user } = this.props;

    if (
      userInState &&
      userInState._id === user._id &&
      router.asPath !== '/u/me'
    ) {
      console.log('here caso 1');
      router.push(`/user?userId=${user._id}&isMe=true`, '/u/me');
    } else if (
      !userInState ||
      (userInState._id !== user._id && router.asPath === '/u/me')
    ) {
      console.log('here caso 2');
      router.push(`/user?userId=${user._id}`, `/u/${user._id}`);
    }
  };

  async componentDidMount() {
    console.log('montato');
    this.checkAuth();
    await this.getUserStatistics();
  }

  async componentDidUpdate(prevProps) {
    // this.checkAuth();
    if (prevProps.user._id !== this.props.user._id) {
      await this.getUserStatistics();
    }
  }
  async getUserStatistics() {
    const { endpoint, options } = apiEndpoints.userStatistics;
    const { _id } = this.props.user;
    const { isMe } = this.props;

    const dynamicEndpoint = isMe
      ? `${endpoint}/${_id}?isMe=yes`
      : `${endpoint}/${_id}`;

    await apiCall(
      dynamicEndpoint,
      options,
      infos => {
        const { recipes, userComments, userRates } = infos.data;
        this.setState({
          recipes,
          userComments,
          userRates,
          isLoading: false
        });
      },
      error => {}
    );
  }

  render() {
    const { user, error, isMe } = this.props;
    const { recipes, userComments, userRates, isLoading } = this.state;

    if (error) {
      return <ErrorPage statusCode={error.status} />;
    }

    return (
      <Fragment>
        <Head>
          <title>{user.username + ' | React Recipes'}</title>
        </Head>
        <SingleUser
          user={user}
          recipes={recipes}
          comments={userComments}
          rates={userRates}
          isLoading={isLoading}
        />
      </Fragment>
    );
  }
}

export default withRouter(User);
