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
      json => {
        router.push('/auth/login');
        logoutSuccess(json.meta.message);
      },
      error => {
        logoutFail(error.meta);
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
            cursor: pointer;
            font-size: inherit;
          }

          .logout span {
            margin-right: 10px;
          }

          @media (min-width: 499px) {
            .logout {
              color: inherit;
              margin-top: 0;
              padding: 0 6px;
              max-height: 36px;
              flex: ${this.props.full ? '0 0 100%' : '0 0 24%'};
            }

            .logout p {
              margin: 0;
            }
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
    logoutSuccess: message => dispatch(successLogout(message)),
    logoutFail: error => dispatch(failLogout(error))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(LogoutButton));
