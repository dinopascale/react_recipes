import React, { Component } from 'react';

import SingleInput from '../SingleInput';
import ActionButton from '../../ActionButton';

class MultipleInputs extends Component {
  render() {
    return (
      <div className="multiple-group-form">
        <div className="multiple-group-form-header">
          <p className="multiple-group-form-label">
            {this.props.childName} #{this.props.index + 1}
          </p>
          <ActionButton
            icon="trash"
            customStyle={{
              fontSize: '14px',
              color: '#777',
              paddingRight: '0',
              justifyContent: 'flex-end'
            }}
            handleClick={this.props.multipleDelete}
          />
        </div>
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
            padding: 18px 0 8px 0;
          }

          .multiple-group-form-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1em 0;
          }

          .multiple-group-form-label {
            margin: 0;
            font-weight: bold;
            color: #777;
            text-transform: uppercase;
          }
        `}</style>
      </div>
    );
  }
}

export default MultipleInputs;
