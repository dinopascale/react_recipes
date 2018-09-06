import React, { Component } from 'react';
import MultipleInputs from './MultipleInputs';

class ArrayOfInputs extends Component {
  refsCollection = {};

  handleChangeArray = index => event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const data = this.props.fields.value.map((f, i) => {
      if (i === index) {
        return {
          ...f,
          [name]: {
            ...f[name],
            value
          }
        };
      }
      return f;
    });
    this.props.change(null, data);
  };

  handleBlurArray = index => event => {
    const target = event.target;
    const name = target.name;

    const fieldValues = [...this.props.fields.value];
    const field = fieldValues[index][name];

    const singleResult = this.props.validateSingle(field);
    fieldValues[index][name] = singleResult;

    this.props.blur(null, {
      ...this.props.fields,
      value: fieldValues
    });
  };

  handleDelete = index => event => {
    event.preventDefault();
    this.props.deleteField(null, index);
  };

  handleAddNew = event => {
    this.props.addNewField(event);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.fields.value.length !== this.props.fields.value.length) {
      const target = this.refsCollection.btn;
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
  render() {
    return (
      <div>
        {this.props.fields.value.map((subfield, index) => (
          <div key={index}>
            <MultipleInputs
              multiple={subfield}
              multipleChange={this.handleChangeArray(index)}
              multipleBlur={this.handleBlurArray(index)}
              multipleDelete={this.handleDelete(index)}
            />
          </div>
        ))}
        <button
          ref={btnAdd => (this.refsCollection['btn'] = btnAdd)}
          onClick={this.handleAddNew}
        >
          Add New
        </button>
      </div>
    );
  }
}

export default ArrayOfInputs;
