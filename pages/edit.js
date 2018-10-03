import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

import { exitEdit } from '../store/actions';
import EditToolbar from '../frontend/component/EditToolbar';
import Form from '../frontend/shared/Form';
import apiEndpoints from '../frontend/utils/apiEndpoints';
import EditRecipeForm from '../frontend/component/EditRecipeForm';
import apiCall from '../frontend/utils/apiCall';
import EditUserForm from '../frontend/component/EditUserForm';

class Edit extends Component {
  static async getInitialProps({ res, query }) {
    if (res) {
      res.writeHead(302, {
        Location: '/'
      });
      res.end();
    }
    const { id } = query;
    const isRecipe = !!query.isRecipe;
    const isUser = !!query.isUser;

    let schema = null;
    const endpoint = isUser ? '/api/s/user' : '/api/s/recipe';
    const options = {
      method: isUser ? 'POST' : 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: isUser ? JSON.stringify({}) : null
    };

    await apiCall(
      endpoint,
      options,
      json => (schema = json.data.schema),
      err => (schema = err)
    );

    return { id, isRecipe, isUser, schema };
  }

  render() {
    const { isRecipe, schema, item, exitSansSave, exitWithSave } = this.props;
    const { endpoint, options } = isRecipe
      ? apiEndpoints.editRecipe
      : apiEndpoints.editUser;
    const type = isRecipe ? 'recipe' : 'user';
    return (
      <Fragment>
        <Head>
          <title>Edit | React Recipes</title>
        </Head>
        <div>
          <Form
            endpoint={`${endpoint}/${isRecipe ? item._id : 'me'}`}
            options={options}
            data={schema}
            filledValues={item}
            submitSuccess={response =>
              exitWithSave(type, response.data.updatedMe)
            }
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
              <div className="container">
                <EditToolbar save={onSubmit} exit={() => exitSansSave(type)} />
                {isRecipe ? (
                  <EditRecipeForm
                    form={state}
                    changed={onChange}
                    blurred={onBlur}
                    validate={validateSingle}
                    addNew={addNewField}
                    deleteField={deleteField}
                  />
                ) : (
                  <EditUserForm
                    form={state}
                    changed={onChange}
                    blurred={onBlur}
                  />
                )}
                <style jsx>{`
                  .container {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: center;
                    align-items: flex-start;
                  }
                `}</style>
              </div>
            )}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    item: state.toEdit.item
  };
};

const mapDispatchToProps = dispatch => {
  return {
    exitSansSave: kind => dispatch(exitEdit(kind)),
    exitWithSave: (kind, updatedUser) =>
      dispatch(exitEdit(kind, updatedUser, true))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Edit));
