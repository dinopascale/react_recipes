import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { actionTypes } from '../../store/actions';
import Meta from '../component/Meta';
import Toolbar from '../component/Toolbar';
import SideDrawer from '../component/SideDrawer';
import Modal from '../component/Modal';
import Spinner from '../component/Spinner';
import Snackbar from '../shared/Snackbar';
import { CSSTransitionGroup } from 'react-transition-group';

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
    const { closeModal, errMessage, modal } = this.props;
    return (
      <Fragment>
        {this.props.loading ? <Spinner /> : null}
        <Meta
          isScrollable={!(this.state.showSideDrawer || this.props.modal.isOpen)}
        />
        <div
          className={
            this.props.loading ? 'app-container blurred' : 'app-container'
          }
        >
          <Toolbar
            opened={this.openSideDrawerHandler}
            isAuth={!!this.props.userInfo}
            userId={this.props.userInfo ? this.props.userInfo._id : null}
          />
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.closeSideDrawerHandler}
            user={this.props.userInfo}
          />
          <main className="content">{this.props.children}</main>
          {/* <Modal
            close={this.props.closeModal}
            isOpen={this.props.modal.isOpen}
            error={this.props.errMessage}
            isSuccess={this.props.modal.isSuccess}
          /> */}
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {modal.isOpen ? (
              <Snackbar
                close={closeModal}
                isOpen={modal.isOpen}
                message={modal.message}
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
    modal: state.modal,
    errMessage: state.errorMessage,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch({ type: actionTypes.HIDE_MODAL })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
