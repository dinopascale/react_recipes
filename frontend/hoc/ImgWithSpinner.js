import React, { Component } from 'react';

class ImgWithSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false
    };
  }

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
