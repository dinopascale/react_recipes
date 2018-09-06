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

    //first validate chunk
    const fieldsToValidate = [...fields];
    let chunks = [];
    if (!fieldsToValidate[0].rules) {
      for (let field of fieldsToValidate) {
        Object.values(field).forEach(el => {
          chunks.push(el);
        });
      }
    } else {
      chunks = fieldsToValidate;
    }

    console.log(chunks);

    const result = this.props.validateChunk(chunks);

    if (result) {
      this.setState({
        activeStep,
        errorMessage: null
      });
    } else {
      this.setState({
        errorMessage:
          'It seems that there is some field invalid! Correct them and proceed with your recipe'
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

  render() {
    return <div>{this.props.render(this.state, this.goNext, this.goBack)}</div>;
  }
}

export default Steps;
