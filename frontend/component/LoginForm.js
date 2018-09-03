import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import { callApi, successLogin, failLogin } from '../../store/actions';
import { tryLogin } from '../../store/actions';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  };

  onChangeHandler = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  onSubmitHandler = async () => {
    // this.props.onSubmit(this.state.email, this.state.password);
    const { email, password } = this.state;
    const endpoint = '/api/user/login';
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    };

    this.props.callApi(
      endpoint,
      options,
      json => {
        this.props.loginSuccess(json.userInfo);
        this.props.router.push('/');
      },
      error => {
        this.props.loginFail(error);
      }
    );
  };

  render() {
    return (
      <div>
        <input
          type="text"
          name="email"
          onChange={this.onChangeHandler}
          placeholder="email"
        />
        <input
          type="text"
          name="password"
          onChange={this.onChangeHandler}
          placeholder="pass"
        />
        <button onClick={this.onSubmitHandler}>Submit</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // onSubmit: (email, password) => dispatch(tryLogin(email, password))
    loginSuccess: userInfo => dispatch(successLogin(userInfo)),
    loginFail: error => dispatch(failLogin(error)),
    callApi: (endpoint, options, onSuccess, onFail) =>
      dispatch(callApi(endpoint, options, onSuccess, onFail))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(LoginForm));
