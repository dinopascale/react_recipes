import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import ErrorPage from './_error';

import apiEndpoints from '../frontend/utils/apiEndpoints';
import apiCall from '../frontend/utils/apiCall';
import SingleUser from '../frontend/component/SingleUser';

class User extends Component {
  static async getInitialProps({ req, query }) {
    try {
      const isServer = !!req;
      const userId = query.userId;

      if (isServer) {
        const { db } = req;
        const queryDbResults = await db.models['User']
          .find({ _id: userId })
          .select('avatar username bio');
        const user = queryDbResults[0];

        return {
          user
        };
      }

      const { endpoint, options } = apiEndpoints.user;
      let user = null;
      let error = null;

      await apiCall(
        `${endpoint}/${userId}`,
        options,
        json => (user = json.user),
        error => (error = error)
      );

      return { user, error };
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

  async componentDidMount() {
    const { endpoint, options } = apiEndpoints.userStatistics;
    const { _id } = this.props.user;

    await apiCall(
      `${endpoint}/${_id}`,
      options,
      infos => {
        this.setState({
          recipes: infos.recipes,
          userComments: infos.userComments,
          userRates: infos.userRates,
          isLoading: false
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  render() {
    const { user, error } = this.props;
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
          recipes={recipes ? recipes.length : 0}
          comments={userComments}
          rates={userRates}
          isLoading={isLoading}
        />
      </Fragment>
    );
  }
}

export default User;
