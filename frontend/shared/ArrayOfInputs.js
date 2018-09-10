import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

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
        <CSSTransitionGroup
          transitionName="slide"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.props.fields.value.map((subfield, index) => (
            <div key={index}>
              <MultipleInputs
                childName="Ingredient"
                index={index}
                multiple={subfield}
                multipleChange={this.handleChangeArray(index)}
                multipleBlur={this.handleBlurArray(index)}
                multipleDelete={this.handleDelete(index)}
              />
            </div>
          ))}
        </CSSTransitionGroup>
        <button
          ref={btnAdd => (this.refsCollection['btn'] = btnAdd)}
          onClick={this.handleAddNew}
          className="add-new-btn"
        >
          Add New
        </button>
        <style jsx>{`
          .add-new-btn {
            border: none;
            border-radius: 5px;
            background: #ffd166;
            display: block;
            width: 50%;
            max-width: 150px;
            margin: 30px auto;
            padding: 1em;
            outline: none;
            font-family: 'Open Sans', sans-serif;
          }

          .slide-enter {
            transform: translate(-100%);
            opacity: 0.01;
          }

          .slide-enter.slide-enter-active {
            opacity: 1;
            transform: translate(0%);
            transition: all 400ms ease-in;
          }

          slide-leave {
            opacity: 1;
            transform: translateX(0);
          }

          .slide-leave.slide-leave-active {
            opacity: 0.01;
            transform: translate(-100%);
            transition: all 300ms ease-in;
          }
        `}</style>
      </div>
    );
  }
}

export default ArrayOfInputs;
