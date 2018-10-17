import React, { Component } from 'react';

import {
  successAndCloseModal,
  createErrorMessage,
  callApiP
} from '../../store/actions';

import { validationRules, validationError } from '../utils/validationRules';
import { connect } from 'react-redux';

const isObject = obj => {
  return obj === Object(obj);
};

const transformPropToForm = (prop, filledValue = null) => {
  return prop.reduce((frm, field) => {
    frm[field.name] = {
      name: field.name,
      value: field.subSchema
        ? filledValue && Object.keys(filledValue).length !== 0
          ? filledValue[field.name].map(subfield =>
              transformPropToForm(field.subSchema, subfield)
            )
          : [transformPropToForm(field.subSchema)]
        : filledValue
          ? isObject(filledValue[field.name])
            ? filledValue[field.name].value
            : filledValue[field.name]
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

class Form extends Component {
  constructor(props) {
    super(props);

    const { data, filledValues } = this.props;
    const form = transformPropToForm(data, filledValues);

    this.state = { form };
  }

  extractNestedInfo = array => {
    return array.map(el => {
      return Object.keys(el).reduce((obj, key) => {
        obj[key] = el[key].value;
        return obj;
      }, {});
    });
  };

  formToAPI = () => {
    const form = { ...this.state.form };
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
      submitFail,
      callApi
    } = this.props;

    const optionsWithBody = { ...options, body: JSON.stringify(form) };
    try {
      const json = await callApi(endpoint, optionsWithBody);
      submitSuccess ? submitSuccess(json) : successModal();
    } catch (e) {
      submitFail ? submitFail(e.message) : errorModal(e.message);
    }
  };

  handleInputChange = field => (event, data) => {
    let value = null;
    if (event) {
      const target = event.target;
      value = target.title === 'switch' ? target.checked : target.value;
    } else {
      value = data;
    }

    this.setState({
      form: {
        ...this.state.form,
        [field]: {
          ...this.state.form[field],
          value
        }
      }
    });
  };

  handleInputBlur = field => (event, data) => {
    const fieldToValidate = { ...this.state.form[field] };
    let result = data ? data : this.validateSingle(fieldToValidate);
    this.setState({
      form: {
        ...this.state.form,
        [field]: {
          ...this.state.form[field],
          ...result
        }
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
    const subSchema = transformPropToForm(field.subSchema);

    const value = [...field.value];
    value.push(subSchema);
    this.setState({
      form: {
        ...this.state.form,
        [field.name]: {
          ...this.state.form[field.name],
          value
        }
      }
    });
  };

  deleteField = field => (event, index) => {
    const value = field.value.filter((subfield, i) => i !== index);
    this.setState({
      form: {
        ...this.state.form,
        [field.name]: {
          ...this.state.form[field.name],
          value
        }
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { step, data, filledValues } = this.props;

    if (step && prevProps.step !== step) {
      const form = transformPropToForm(data, filledValues);
      this.setState({
        form
      });
    }
  }

  render() {
    return this.props.render(
      this.state.form,
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
    callApi: (endpoint, options) => dispatch(callApiP(endpoint, options)),
    successModal: () => dispatch(successAndCloseModal()),
    errorModal: error => dispatch(createErrorMessage(error))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Form);
