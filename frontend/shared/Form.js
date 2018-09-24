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

  transformPropToForm = (prop, filledValue = null) => {
    return prop.reduce((frm, field) => {
      frm[field.name] = {
        name: field.name,
        value: field.subSchema
          ? filledValue
            ? filledValue[field.name].map(subfield =>
                this.transformPropToForm(field.subSchema, subfield)
              )
            : [this.transformPropToForm(field.subSchema)]
          : filledValue
            ? filledValue[field.name]
            : field.default,
        enum: field.enum,
        instance: field.instance,
        isPristine: true,
        isInvalid: true,
        subSchema: field.subSchema,
        errorMessage: null,
        rules: {
          ...field.validationRules,
          isUrl: field.name === 'img',
          isEmail: field.name === 'email'
        }
      };
      return frm;
    }, {});
  };

  extractNestedInfo = array => {
    return array.map(el => {
      return Object.keys(el).reduce((obj, key) => {
        obj[key] = el[key].value;
        return obj;
      }, {});
    });
  };

  formToAPI = () => {
    const form = { ...this.state };
    return Object.keys(form).reduce((obj, fieldName) => {
      obj[fieldName] = form[fieldName].subSchema
        ? this.extractNestedInfo(form[fieldName].value)
        : form[fieldName].value;
      return obj;
    }, {});
  };

  handleSubmit = async (event, data) => {
    event.preventDefault();
    const form = this.formToAPI();

    const {
      endpoint,
      options,
      successModal,
      errorModal,
      submitSuccess,
      submitFail
    } = this.props;

    const optionsWithBody = { ...options, body: JSON.stringify(form) };
    await this.props.callApi(
      endpoint,
      optionsWithBody,
      json => {
        submitSuccess ? submitSuccess(json) : successModal();
      },
      error => {
        submitFail ? submitFail(error) : errorModal(error);
      }
    );
  };

  handleInputChange = field => (event, data) => {
    let value = null;
    if (event) {
      const target = event.target;
      value =
        target.tagName === 'LABEL'
          ? target.previousSibling.value
          : target.value;
    } else {
      value = data;
    }

    this.setState({
      [field]: {
        ...this.state[field],
        value:
          this.state[field].instance === 'Boolean' ? value === 'true' : value
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

  validateChunk = chunk => {
    return chunk
      .map(field => {
        if (field.subSchema) {
          const generalValidity = [];
          const singleValue = field.value.map(subfield => {
            return Object.keys(subfield).reduce((obj, key) => {
              obj[key] = { ...this.validateSingle(subfield[key]) };
              generalValidity.push(!obj[key].isInvalid);
              return obj;
            }, {});
          });
          this.setState({
            [field.name]: {
              ...this.state[field.name],
              value: singleValue
            }
          });
          return generalValidity.every(validationRes => validationRes);
        } else {
          const result = this.validateSingle(field);
          this.setState({
            [field.name]: {
              ...this.state[field.name],
              ...result
            }
          });
          return !result.isInvalid;
        }
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
    const { data, filledValues } = this.props;
    const form = this.transformPropToForm(data, filledValues);
    console.log('form', form);
    this.setState({
      ...form
    });
  }

  render() {
    return this.props.render(
      this.state,
      this.handleInputChange,
      this.handleInputBlur,
      this.handleSubmit,
      this.validateSingle,
      this.validateChunk,
      this.addNewField,
      this.deleteField,
      this.formToAPI
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
