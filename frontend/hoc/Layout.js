import React, { Fragment } from 'react';

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
          />
          <main className="content">{this.props.children}</main>
        </div>
        <style jsx>{`
          .app-container {
            height: 100%;
            width: 100%;
          }
          .content {
            font-family: 'Open Sans', sans-serif;
          }
        `}</style>
      </Fragment>
    );
  }
}

export default Layout;
