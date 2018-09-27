import React, { Component } from 'react';

class Steps extends Component {
  state = {
    activeStep: 0,
    errorMessage: null
  };

  goNext = fields => event => {
    event.preventDefault();
    let activeStep =
      this.state.activeStep + 1 > this.props.max - 1
        ? this.state.activeStep
        : this.state.activeStep + 1;

    const fieldsToValidate = [...fields];
    const result = this.props.validateChunk(fieldsToValidate);

    if (result) {
      setTimeout(() => {
        this.setState({
          activeStep,
          errorMessage: null
        });
      }, 200);
    } else {
      this.setState({
        errorMessage: "Seems that something it's not correct"
      });
    }
  };

  goBack = event => {
    event.preventDefault();
    this.setState({
      activeStep: this.state.activeStep === 0 ? 0 : this.state.activeStep - 1,
      errorMessage: null
    });
  };

  jumpBack = number => event => {
    if (number >= this.state.activeStep) {
      return false;
    }
    this.setState({
      activeStep: number
    });
  };

  render() {
    return this.props.render(
      this.state,
      this.goNext,
      this.goBack,
      this.jumpBack
    );
  }
}

export default Steps;
