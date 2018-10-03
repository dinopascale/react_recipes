import { Fragment } from 'react';

import ToggleButton from './navMode/ToggleButton';
import Logo from './navMode/Logo';
import NavigationElements from '../../shared/NavigationElements';
import ActionButton from '../../shared/ActionButton';
import DropdownList from '../../hoc/DropdownList';
import DropdownMenu from './navMode/DropdownMenu';
import BackButton from './navMode/BackButton';

export default props => {
  const {
    isAuth,
    isAuthPage,
    opened,
    access,
    userId,
    router,
    editUser,
    editRecipe,
    isRecipeAuthor,
    openModal
  } = props;
  let element = null;

  console.log(router);

  if (router.asPath === '/u/me') {
    element = (
      <ActionButton handleClick={editUser} customStyle={{ color: '#06b4fe' }}>
        Edit
      </ActionButton>
    );
  }

  if (router.pathname === '/recipe' && isRecipeAuthor) {
    element = (
      <DropdownList
        render={(isOpen, toggleShow, close) => (
          <DropdownMenu
            toggle={toggleShow}
            isOpen={isOpen}
            toEdit={editRecipe}
            toDelete={openModal}
          />
        )}
      />
    );
  }
  if (!isAuth) {
    element = (
      <ActionButton
        handleClick={access}
        customStyle={{
          backgroundColor: '#fff',
          color: '#06b4fe'
        }}
      >
        Accedi
      </ActionButton>
    );
  }

  if (isAuthPage) {
    element = null;
  }

  return (
    <Fragment>
      {router.pathname === '/recipe' ? (
        <BackButton />
      ) : (
        <ToggleButton openSideDrawer={opened} />
      )}
      {element}
      <nav className="desktop-only">
        <NavigationElements userId={userId} />
      </nav>
      <style jsx>{`
        .desktop-only {
          display: none;
          color: #fff;
        }

        @media (min-width: 499px) {
          .desktop-only {
            flex: 1 0 1;
            display: inherit;
          }
        }
      `}</style>
    </Fragment>
  );
};
