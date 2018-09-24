import React, { Component, Fragment } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

import { removeItemToEdit } from '../store/actions';
import EditToolbar from '../frontend/component/EditToolbar';

class Edit extends Component {
  static async getInitialProps({ res, query }) {
    if (res) {
      res.writeHead(302, {
        Location: '/'
      });
      res.end();
    }

    const { id, isRecipe } = query;
    return { id, isRecipe };
  }

  closeEdit = () => {
    const { exitEdit, router, item } = this.props;
    exitEdit();
    router.push(`/recipe?id=${item._id}&isRecipe=true`, `/r/${item._id}`);
  };

  render() {
    const { isRecipe, item } = this.props;
    console.log(item);
    return (
      <Fragment>
        <Head>
          <title>Edit | React Recipes</title>
        </Head>
        <div>
          <EditToolbar
            itemId={item._id}
            isRecipe={isRecipe}
            exit={this.closeEdit}
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
