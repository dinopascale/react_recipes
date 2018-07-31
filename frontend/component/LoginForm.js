import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

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

  onSubmitHandler = () => {
    this.props.onSubmit(this.state.email, this.state.password);
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
    onSubmit: (email, password) => dispatch(tryLogin(email, password))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(LoginForm));
