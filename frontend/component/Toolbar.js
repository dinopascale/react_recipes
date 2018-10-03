import React from 'react';
import { withRouter } from 'next/router';

import NavMode from './toolbar/NavMode';

class Toolbar extends React.Component {
  access = () => {
    const { router } = this.props;
    router.push('/auth/login');
  };

  render() {
    const {
      opened,
      isAuth,
      router,
      userId,
      isRecipeAuthor,
      editRecipe,
      editUser,
      openModal
    } = this.props;
    const isEdit = router.pathname === '/edit';
    if (isEdit) {
      return null;
    }

    const isAuthPage =
      router.pathname === '/auth/login' || router.pathname === '/auth/register';

    return (
      <div className="navbar">
        <NavMode
          opened={opened}
          isAuth={isAuth}
          userId={userId}
          isAuthPage={isAuthPage}
          editUser={editUser}
          editRecipe={editRecipe}
          router={router}
          isRecipeAuthor={isRecipeAuthor}
          access={this.access}
          openModal={openModal}
        />
        <style jsx>{`
          .navbar {
            position: fixed;
            width: 100%;
            height: 56px;
            top: 0;
            left: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1 0 0;
            padding: 10px 20px;
            background: #fff;
            z-index: 100;
            box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
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
