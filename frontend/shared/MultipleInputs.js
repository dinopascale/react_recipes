import React, { Component } from 'react';
import SingleInput from './SingleInput';

class MultipleInputs extends Component {
  render() {
    return (
      <div className="multiple-group-form">
        <button onClick={this.props.multipleDelete}>Delete</button>
        {Object.keys(this.props.multiple).map((key, i) => {
          return (
            <SingleInput
              field={this.props.multiple[key]}
              key={key}
              type="text"
              change={this.props.multipleChange}
              blur={this.props.multipleBlur}
            />
          );
        })}
        <style jsx>{`
          .multiple-group-form {
            border-bottom: 1px solid #ccc;
            border-top: 1px solid #ccc;
            padding: 18px 0 8px 0;
          }
        `}</style>
      </div>
    );
  }
}

export default MultipleInputs;
