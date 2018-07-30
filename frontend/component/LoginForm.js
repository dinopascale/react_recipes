import React from 'react';
import fetch from 'isomorphic-unfetch';

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
    console.log(this.state);
    const { email, password } = this.state;
    console.log();
    fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(resp => resp.json())
      .then(data => console.log(data));
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

export default LoginForm;
