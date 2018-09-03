import React, { Component } from 'react';

import {
  callApi,
  successAndCloseModal,
  createErrorMessage
} from '../../store/actions';
import { validationRules, validationError } from '../utils/validationRules';
import { connect } from 'react-redux';

class Form extends Component {
  state = {};

  transformPropToForm = prop => {
    return prop.reduce((frm, field) => {
      frm[field.name] = {
        name: field.name,
        value: field.default,
        enum: field.enum,
        isPristine: true,
        isInvalid: true,
        errorMessage: null,
        rules: field.validationRules
      };
      return frm;
    }, {});
  };

  handleSubmit = async event => {
    event.preventDefault();
    const form = JSON.parse(JSON.stringify(this.state));
    const resultsValidation = this.validateAll(form);

    if (!resultsValidation) {
    }

    const { endpoint, options, successModal, errorModal } = this.props;
    await this.props.callApi(
      endpoint,
      options,
      () => {
        successModal();
      },
      error => {
        errorModal(error);
      }
    );
    console.log('Is Form Valid?', resultsValidation);
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: {
        ...this.state[name],
        value
      }
    });
  };

  handleInputBlur = event => {
    const target = event.target;
    const name = target.name;

    const field = { ...this.state[name] };
    this.validateSingle(field);
  };

  validateSingle = field => {
    let result = {
      isInvalid: false,
      isPristine: false,
      errorMessage: null
    };

    //We filter only for the rules that apply for field
    const rules = Object.keys(field.rules).filter(rule => field.rules[rule]);

    //if no rules we return true
    if (rules.length === 0) {
      this.setState({
        [field.name]: {
          ...this.state[field.name],
          ...result
        }
      });
      return true;
    }

    const valueToTest = !field.value ? '' : field.value;

    //A for loop for all the rules. We break from validation if a test fail
    for (let rule of rules) {
      const test =
        rule === 'regExp'
          ? new RegExp(field.rules[rule][0].replace(/[/]/g, ''))
          : field.rules[rule];
      const isValid = validationRules[rule](valueToTest, test);
      if (!isValid) {
        const errorMessage =
          rule === 'regExp'
            ? field.rules[rule][1]
            : validationError[rule](field.rules[rule]);
        result = {
          isInvalid: true,
          isPristine: false,
          errorMessage
        };
        this.setState({
          [field.name]: {
            ...this.state[field.name],
            ...result
          }
        });
        return false;
      }
      console.log('result for ', rule, ':', isValid);
    }

    //if the value is valid we set the field props to valid and return true
    this.setState({
      [field.name]: {
        ...this.state[field.name],
        ...result
      }
    });

    return true;
  };

  validateAll = form => {
    return Object.keys(form)
      .map(field => {
        console.log('-----', field, '-----');
        const singleFieldResult = this.validateSingle(form[field]);
        console.log('final result: ', singleFieldResult);
        console.log('--------------------------');
        return singleFieldResult;
      })
      .every(validator => validator);
  };

  componentWillMount() {
    const form = this.transformPropToForm(this.props.data);
    this.setState({
      ...form
    });
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        {this.props.render(
          this.state,
          this.handleInputChange,
          this.handleInputBlur,
          this.handleSubmit
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    callApi: (endpoint, options, onSuccess, onFail) =>
      dispatch(callApi(endpoint, options, onSuccess, onFail)),
    successModal: () => dispatch(successAndCloseModal()),
    errorModal: error => dispatch(createErrorMessage(error))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Form);
