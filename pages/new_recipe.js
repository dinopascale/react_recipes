import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import apiCall from '../frontend/utils/apiCall';
import Form from '../frontend/shared/Form';
import NewRecipeForm from '../frontend/component/NewRecipeForm';
import Steps from '../frontend/shared/form/Steps';
import apiEndpoints from '../frontend/utils/apiEndpoints';
import { connect } from 'react-redux';
import { setSchema, callApiP } from '../store/actions';
import WelcomePage from '../frontend/component/new_recipe/WelcomePage';

class NewRecipe extends Component {
  static async getInitialProps(props) {
    const isServer = !!props.req;

    const isSchemaSet =
      props.reduxStore.getState().newRecipe.schema.length !== 0;

    if (isSchemaSet) {
      return {};
    }

    let schema = null;

    try {
      if (isServer) {
        const { db } = props.req;
        schema = db.models['Recipe'].getSchema();
      } else {
        const endpoint = '/api/s/recipe';
        const options = {
          method: 'GET',
          credentials: 'include'
        };
        const json = await props.reduxStore.dispatch(
          callApiP(endpoint, options)
        );
        schema = json.data.schema;
      }
      props.reduxStore.dispatch(setSchema(schema));
    } catch (e) {
      return { error: e };
    }
  }

  render() {
    const { newRecipeSchema, error } = this.props;

    if (error) {
      return <ErrorPage statusCode={error.status} />;
    }

    return (
      <Fragment>
        <Head>
          <title>New Recipe | React Recipes</title>
        </Head>
        {/* <Link
          href="/new_recipe/step?stepName=general&step=1"
          as="/new_recipe/general"
        >
          <a style={{ marginTop: '70px', display: 'inline-block' }}>Ciao</a>
        </Link>
        <Form
          endpoint={apiEndpoints.newRecipe.endpoint}
          options={apiEndpoints.newRecipe.options}
          data={newRecipeSchema}
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
        /> */}
        <div className="container">
          <WelcomePage />
          <style jsx>{`
            .container {
              width: 90%;
              margin: 90px auto 30px auto;
              padding: 30px 16px 20px 16px;
              background: #fff;
              border-radius: 8px;
            }
          `}</style>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    newRecipeSchema: state.newRecipe.schema
  };
};

export default connect(mapStateToProps)(NewRecipe);
