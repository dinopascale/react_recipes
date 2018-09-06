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
        value: field.subSchema
          ? [this.transformPropToForm(field.subSchema)]
          : field.default,
        enum: field.enum,
        instance: field.instance,
        isPristine: true,
        isInvalid: true,
        subSchema: field.subSchema,
        errorMessage: null,
        rules:
          field.name === 'img'
            ? { ...field.validationRules, isUrl: true }
            : field.validationRules
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

    //we need to add body to options
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

  handleInputChange = field => (event, data) => {
    let value = null;
    if (event) {
      const target = event.target;
      value = target.type === 'checkbox' ? target.checked : target.value;
    } else {
      value = data;
    }

    this.setState({
      [field]: {
        ...this.state[field],
        value
      }
    });
  };

  handleInputBlur = field => (event, data) => {
    const fieldToValidate = { ...this.state[field] };
    let result = data ? data : this.validateSingle(fieldToValidate);
    this.setState({
      [field]: {
        ...this.state[field],
        ...result
      }
    });
  };

  validateSingle = field => {
    const fieldToValidate = { ...field };

    const dirtyAndValid = {
      isInvalid: false,
      isPristine: false,
      errorMessage: null
    };

    const dirtyAndInvalid = {
      isInvalid: true,
      isPristine: false,
      errorMessage: null
    };

    const rules = Object.keys(fieldToValidate.rules).filter(
      rule => fieldToValidate.rules[rule]
    );

    if (rules.length === 0) {
      return {
        ...fieldToValidate,
        ...dirtyAndValid
      };
    }

    const valueToTest = !field.value ? '' : field.value;

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
        return {
          ...fieldToValidate,
          ...dirtyAndInvalid,
          errorMessage
        };
      }
    }

    return {
      ...fieldToValidate,
      ...dirtyAndValid
    };
  };

  validateAll = form => {
    // return Object.keys(form)
    //   .map(field => {
    //     console.log('-----', field, '-----');
    //     const singleFieldResult = this.validateSingle(form[field]);
    //     console.log('final result: ', singleFieldResult);
    //     console.log('--------------------------');
    //     return singleFieldResult;
    //   })
    //   .every(validator => validator);
  };

  validateChunk = chunk => {
    return chunk
      .map(field => {
        const result = this.validateSingle(field);
        return !result.isInvalid;
      })
      .every(validateResult => validateResult);
  };

  //dynamic operation on Form

  addNewField = field => event => {
    event.preventDefault();
    const subSchema = this.transformPropToForm(field.subSchema);

    const value = [...field.value];
    value.push(subSchema);
    this.setState({
      [field.name]: {
        ...this.state[field.name],
        value
      }
    });
  };

  deleteField = field => (event, index) => {
    const value = field.value.filter((subfield, i) => i !== index);
    this.setState({
      [field.name]: {
        ...this.state[field.name],
        value
      }
    });
  };

  componentWillMount() {
    const form = this.transformPropToForm(this.props.data);
    this.setState({
      ...form
    });
  }

  componentDidMount() {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        {this.props.render(
          this.state,
          this.handleInputChange,
          this.handleInputBlur,
          this.handleSubmit,
          this.validateSingle,
          this.validateChunk,
          this.addNewField,
          this.deleteField
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
