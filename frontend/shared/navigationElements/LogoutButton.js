import React from 'react';
import { connect } from 'react-redux';
import { tryLogout } from '../../../store/actions';

class LogoutButton extends React.Component {
  clickHandler = () => {
    this.props.onLogout();
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
)(LogoutButton);
