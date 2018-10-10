import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

import { setValuesForm } from '../../store/actions';

class WizardForm extends Component {
  state = {
    errorValidation: false
  };

  extractValues = obj => {
    return Object.values(obj).reduce((newObj, element) => {
      newObj[element.name] = element.value;
      return newObj;
    }, {});
  };

  objToArr = obj => {
    return Object.keys(obj).map(key => {
      return obj[key];
    });
  };

  goNext = fields => event => {
    event.preventDefault();
    const { validateFields, step, steps, setValues, router } = this.props;

    const fieldsToTransform = { ...fields };

    const fieldsToValidate = this.objToArr(fieldsToTransform);
    const result = validateFields(fieldsToValidate);

    console.log(result, fieldsToValidate);

    if (result) {
      this.setState({
        errorValidation: false
      });
      const values = this.extractValues(fields);
      setValues(values);
      router.push(
        `/new_recipe/step?stepName=${steps[step]}&step=${+step + 1}`,
        `/new_recipe/${steps[step]}`
      );
    } else {
      return this.setState({
        errorValidation: true
      });
    }
  };

  goBack = () => {};

  pushRoute = () => {
    const { router } = this.props;
  };

  render() {
    const { errorValidation } = this.state;
    return this.props.render(errorValidation, this.goNext);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setValues: values => dispatch(setValuesForm(values))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(WizardForm));
