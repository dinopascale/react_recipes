import React, { Component } from 'react';

import apiCall from '../../frontend/utils/apiCall';
import apiEndpoints from '../../frontend/utils/apiEndpoints';

class Me extends Component {
  static async getInitialProps({ req, res }) {
    try {
      const isServer = !!req;

      if (isServer) {
        const { db } = req;
        const myId = res.locals.issuerId;

        const queryDbResults = await db.models['User']
          .find({ _id: myId })
          .select('username avatar bio');
        const me = queryDbResults[0];

        return {
          me
        };
      }

      const { endpoint, options } = apiEndpoints.me;
      let me = null;
      let error = null;

      await apiCall(
        endpoint,
        options,
        json => (me = json.user),
        error => (error = error)
      );

      return { me, error };
    } catch (error) {
      return { error };
    }
  }

  componentDidMount() {
    console.log(this.props.me);
  }

  render() {
    return <div>Me</div>;
  }
}

export default Me;
