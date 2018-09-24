import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

import { removeItemToEdit } from '../store/actions';
import EditToolbar from '../frontend/component/EditToolbar';
import Form from '../frontend/shared/Form';
import apiEndpoints from '../frontend/utils/apiEndpoints';
import EditRecipeForm from '../frontend/component/EditRecipeForm';
import apiCall from '../frontend/utils/apiCall';

class Edit extends Component {
  static async getInitialProps({ res, query }) {
    if (res) {
      res.writeHead(302, {
        Location: '/'
      });
      res.end();
    }

    const { id, isRecipe } = query;

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

    return { id, isRecipe, schema };
  }

  closeEdit = () => {
    const { exitEdit, router, item } = this.props;
    exitEdit();
    router.push(`/recipe?id=${item._id}&isRecipe=true`, `/r/${item._id}`);
  };

  render() {
    const { isRecipe, schema, item } = this.props;
    const { endpoint, options } = apiEndpoints.editRecipe;
    console.log(item, schema);
    return (
      <Fragment>
        <Head>
          <title>Edit | React Recipes</title>
        </Head>
        <div>
          <Form
            endpoint={`${endpoint}/${item._id}`}
            options={options}
            data={schema}
            filledValues={item}
            submitSuccess={this.closeEdit}
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
                <EditToolbar save={onSubmit} exit={this.closeEdit} />
                <EditRecipeForm
                  form={state}
                  changed={onChange}
                  blurred={onBlur}
                  validate={validateSingle}
                  addNew={addNewField}
                  deleteField={deleteField}
                />
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
    exitEdit: () => dispatch(removeItemToEdit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Edit));
