import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import ErrorPage from './_error';
import { connect } from 'react-redux';

import { addItemToEdit } from '../store/actions';

import apiEndpoints from '../frontend/utils/apiEndpoints';
import apiCall from '../frontend/utils/apiCall';
import SingleUser from '../frontend/component/SingleUser';
import FloatingButton from '../frontend/shared/FloatingButton';

class User extends Component {
  static async getInitialProps({ req, res, query }) {
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
      isMe = query.isMe || false;
      userId = query.userId;

      console.log(userId);

      await apiCall(
        `${endpoint}/${userId}`,
        options,
        json => (user = json.user),
        error => (error = error)
      );

      return { user, error, isMe };
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
    console.log(this.props);
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

  goToEditMode = event => {
    event.preventDefault();
    const { router, user, addUserToEdit } = this.props;
    router.push(`/edit?id=${user._id}&isUser=true`, `/edit_user/${user._id}`);
    addUserToEdit(user);
  };

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
        {isMe ? (
          <FloatingButton icon="edit" action={this.goToEditMode} />
        ) : null}
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

const mapDispatchToProps = dispatch => {
  return {
    addUserToEdit: user => dispatch(addItemToEdit(user))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(User));
