import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
  actionTypes,
  editUserInfo,
  editRecipeInfo,
  openModal
} from '../../store/actions';
import Meta from '../component/Meta';
import Toolbar from '../component/Toolbar';
import SideDrawer from '../component/SideDrawer';
import Modal from '../component/Modal';
import Spinner from '../component/Spinner';
import Snackbar from '../shared/Snackbar';
import { CSSTransitionGroup } from 'react-transition-group';
import ConfirmationModal from '../component/ConfirmationModal';

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };

  openSideDrawerHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    const {
      closeModal,
      snackbar,
      modal,
      addUserToEdit,
      addRecipeToEdit,
      isRecipeAuthor,
      openModal
    } = this.props;
    return (
      <Fragment>
        {this.props.loading ? <Spinner /> : null}
        <Meta isScrollable={!(this.state.showSideDrawer || modal.isOpen)} />
        <div
          className={
            this.props.loading ? 'app-container blurred' : 'app-container'
          }
        >
          <Toolbar
            opened={this.openSideDrawerHandler}
            isAuth={!!this.props.userInfo}
            userId={this.props.userInfo ? this.props.userInfo._id : null}
            editUser={addUserToEdit}
            editRecipe={addRecipeToEdit}
            openModal={openModal}
            isRecipeAuthor={isRecipeAuthor}
          />
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.closeSideDrawerHandler}
            user={this.props.userInfo}
          />
          <main className="content">{this.props.children}</main>
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {snackbar.isOpen ? (
              <Snackbar
                close={closeModal}
                isOpen={snackbar.isOpen}
                message={snackbar.message}
              />
            ) : null}
          </CSSTransitionGroup>
          <style jsx>{`
            .app-container {
              min-height: 100%;
              width: 100%;
              overflow: hidden;
              position: relative;
              background-color: #cad1de;
            }

            .app-container.blurred {
              //   filter: blur(2px);
            }

            .content {
              //   max-width: 800px;
              min-height: 100vh;
              background-color: #cad1de;
              margin: 0 auto;
            }
          `}</style>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.auth.user,
    snackbar: state.snackbar,
    modal: state.confirmationModal,
    loading: state.loading,
    isRecipeAuthor: state.recipe ? state.recipe.isAuthor : false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch({ type: actionTypes.HIDE_SNACKBAR }),
    addUserToEdit: () => dispatch(editUserInfo()),
    addRecipeToEdit: () => dispatch(editRecipeInfo()),
    openModal: () => dispatch(openModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
