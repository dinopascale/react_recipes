import React, { Component, Fragment } from 'react';
import Head from 'next/head';

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
    const { error } = this.props;

    if (error) {
      return <ErrorPage statusCode={error.status} />;
    }

    return (
      <Fragment>
        <Head>
          <title>New Recipe | React Recipes</title>
        </Head>
        <div className="container">
          <WelcomePage />
          <style jsx>{`
            .container {
              width: 90%;
              margin: 0 auto;
              padding: 160px 16px 20px 16px;
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
