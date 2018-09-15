import React, { Component } from 'react';

class ImgWithSpinner extends Component {
  state = {
    loading: true,
    error: false
  };

  handleLoading = () => {
    this.setState({
      loading: false
    });
  };

  handleError = () => {
    this.setState({
      loading: false,
      error: true
    });
  };

  render() {
    return this.props.render(this.state, this.handleError, this.handleLoading);
  }
}

export default ImgWithSpinner;
