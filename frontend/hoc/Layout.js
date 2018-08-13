import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Meta from '../component/Meta';
import Toolbar from '../component/Toolbar';
import SideDrawer from '../component/SideDrawer';

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
    return (
      <Fragment>
        <Meta />
        <div className="app-container">
          <Toolbar opened={this.openSideDrawerHandler} />
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.closeSideDrawerHandler}
            user={this.props.userInfo}
          />
          <main className="content">{this.props.children}</main>
        </div>
        <style jsx>{`
          .app-container {
            height: 100%;
            width: 100%;
            overflow-x: hidden;
          }
          .content {
            font-family: 'Open Sans', sans-serif;
          }
        `}</style>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.auth.user
  };
};

export default connect(mapStateToProps)(Layout);
