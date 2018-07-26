import React, { Fragment } from 'react';
import Head from 'next/head';

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
        <Head>
          <title>{this.props.title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Fredoka+One|Open+Sans"
            rel="stylesheet"
          />
        </Head>
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
          }
          .content {
            font-family: 'Open Sans', sans-serif;
            box-sizing: border-box;
          }
        `}</style>
      </Fragment>
    );
  }
}

export default Layout;
