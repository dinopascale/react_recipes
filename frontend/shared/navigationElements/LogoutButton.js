import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { callApi, successLogout, failLogout } from '../../../store/actions';
import apiEndpoints from '../../utils/apiEndpoints';

class LogoutButton extends React.Component {
  clickHandler = async () => {
    const { logoutSuccess, logoutFail, callApi, router } = this.props;
    const { endpoint, options } = apiEndpoints.logout;
    await callApi(
      endpoint,
      options,
      () => {
        router.push('/auth/login');
        logoutSuccess();
      },
      error => {
        logoutFail(error);
      }
    );
  };

  render() {
    return (
      <button className="logout" onClick={this.clickHandler}>
        <p>
          <span>
            <FontAwesomeIcon icon="sign-out-alt" />
          </span>
          Logout
        </p>
        <style jsx>{`
          .logout {
            margin-top: 20px;
            background: transparent;
            border: none;
            color: #555;
            font-size: 16px;
            text-align: left;
            padding: 0;
          }

          .logout span {
            margin-right: 10px;
          }
        `}</style>
      </button>
    );
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
