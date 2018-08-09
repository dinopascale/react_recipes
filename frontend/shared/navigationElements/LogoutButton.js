import React from 'react';
import { connect } from 'react-redux';
import { tryLogout } from '../../../store/actions';
import { withRouter } from 'next/router';

class LogoutButton extends React.Component {
  clickHandler = () => {
    this.props.onLogout();
    this.props.router.push('/');
  };

  render() {
    return <button onClick={this.clickHandler}>Logout</button>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(tryLogout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(LogoutButton));
