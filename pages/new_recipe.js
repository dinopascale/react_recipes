import React, { Component } from 'react';
import Head from 'next/head';

import apiCall from '../frontend/utils/apiCall';
import Form from '../frontend/shared/Form';
import NewRecipeForm from '../frontend/component/NewRecipeForm';
import Steps from '../frontend/shared/form/Steps';
import apiEndpoints from '../frontend/utils/apiEndpoints';

class NewRecipe extends Component {
  static async getInitialProps(props) {
    if (props.req) {
      const { db } = props.req;
      const schema = db.models['Recipe'].getSchema();
      return { schema };
    }

    let schema = null;
    const endpoint = '/api/s/recipe';
    const options = {
      method: 'GET',
      credentials: 'include'
    };

    await apiCall(
      endpoint,
      options,
      json => (schema = json.schema),
      err => (schema = err)
    );

    return { schema };
  }

  componentDidMount() {
    console.log(this.props.schema);
  }

  render() {
    return (
      <div>
        <Head>
          <title>New Recipe</title>
        </Head>
        {/* New Recipe */}
        <Form
          endpoint={apiEndpoints.newRecipe.endpoint}
          options={apiEndpoints.newRecipe.options}
          data={this.props.schema}
          render={(
            state,
            onChange,
            onBlur,
            onSubmit,
            validateSingle,
            validateChunk,
            addNewField,
            deleteField,
            formToAPI
          ) => (
            <Steps
              validateChunk={validateChunk}
              max="5"
              render={(steps, goNext, goBack, jumpBack) => (
                <NewRecipeForm
                  form={state}
                  changed={onChange}
                  blurred={onBlur}
                  submitted={onSubmit}
                  validate={validateSingle}
                  addNew={addNewField}
                  deleteField={deleteField}
                  steps={steps}
                  next={goNext}
                  back={goBack}
                  jump={jumpBack}
                  dataToApi={formToAPI}
                  max="5"
                />
              )}
            />
          )}
        />
      </div>
    );
  }
}

export default NewRecipe;
