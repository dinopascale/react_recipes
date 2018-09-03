import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import { callApi, successLogout, failLogout } from '../../../store/actions';
import apiEndpoints from '../../utils/apiEndpoints';

class LogoutButton extends React.Component {
  clickHandler = async () => {
    const { logoutSuccess, logoutFail, callApi } = this.props;
    const { endpoint, options } = apiEndpoints.logout;
    await callApi(
      endpoint,
      options,
      () => {
        logoutSuccess();
      },
      error => {
        logoutFail(error);
      }
    );
  };

  render() {
    return <button onClick={this.clickHandler}>Logout</button>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    callApi: (endpoint, options, onSuccess, onFail) =>
      dispatch(callApi(endpoint, options, onSuccess, onFail)),
    logoutSuccess: () => dispatch(successLogout()),
    logoutFail: error => dispatch(failLogout(error)),
    onLogout: () => dispatch(tryLogout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(LogoutButton));
