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
      json => (schema = json.schema),
      err => (schema = err)
    );

    return { id, isRecipe, isUser, schema };
  }

  closeEdit = response => {
    const { exitEdit, router, item, isUser } = this.props;
    const as = isUser ? `/u/me` : `/r/${item._id}`;
    const href = isUser
      ? `/user?userId=${item._id}&isMe=true`
      : `/recipe?id=${item._id}&isRecipe=true`;
    if (isUser && response.updatedMe) {
      exitEdit(isUser, response.updatedMe);
      return router.push(href, as);
    }
    exitEdit();
    router.push(href, as);
  };

  //   componentDidMount() {
  //     if (!Object.keys(this.props.item).length) {
  //       this.props.router.push('/recipes');
  //     }
  //   }

  render() {
    const { isRecipe, schema, item } = this.props;
    const { endpoint, options } = isRecipe
      ? apiEndpoints.editRecipe
      : apiEndpoints.editUser;
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
    exitEdit: (isUser, updateUser) =>
      dispatch(removeItemToEdit(isUser, updateUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Edit));
