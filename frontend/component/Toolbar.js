import React from 'react';
import { withRouter } from 'next/router';

import NavMode from './toolbar/NavMode';

class Toolbar extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const nextPath = nextProps.router.pathname;
    const actualPath = this.props.router.pathname;
    return (
      (nextPath === '/edit' && actualPath !== '/edit') ||
      (nextPath !== '/edit' && actualPath === '/edit') ||
      this.props.isAuth !== nextProps.isAuth
    );
  }

  render() {
    const { opened, isAuth, router, userId } = this.props;
    const isEdit = router.pathname === '/edit';
    if (isEdit) {
      return null;
    }
    return (
      <div className="navbar">
        <NavMode opened={opened} isAuth={isAuth} userId={userId} />
        <style jsx>{`
          .navbar {
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            display: flex;
            justify-content: space-between;
            flex: 1 0 0;
            padding: 10px 20px;
            background: transparent;
            z-index: 100;
          }

          @media (min-width: 499px) {
            .navbar {
              padding: 10px 110px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default withRouter(Toolbar);
