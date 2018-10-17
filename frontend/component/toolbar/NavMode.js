import { Fragment } from 'react';

import ToggleButton from './navMode/ToggleButton';
import Logo from './navMode/Logo';
import NavigationElements from '../../shared/NavigationElements';
import ActionButton from '../../shared/ActionButton';
import DropdownList from '../../hoc/DropdownList';
import DropdownMenu from './navMode/DropdownMenu';
import BackButton from './navMode/BackButton';
import DropdownDesktop from './navMode/DropdownDesktop';
import NavigationElement from '../../shared/navigationElements/NavigationElement';

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

  if (router.asPath === '/u/me') {
    element = (
      <ActionButton
        handleClick={editUser}
        customStyle={{
          background: 'none',
          color: '#06b4fe',
          border: 'none',
          width: '100%',
          height: '36px',
          outline: 'none',
          textAlign: 'right'
        }}
      >
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
          background: '#06b4fe',
          color: '#fff',
          border: 'none',
          width: '100%',
          height: '36px',
          outline: 'none',
          cursor: 'pointer'
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
      <div className="mobile-only">
        {router.pathname === '/recipe' ? (
          <BackButton />
        ) : (
          <ToggleButton openSideDrawer={opened} />
        )}
        {element}
      </div>
      <div className="desktop-only">
        <NavigationElement
          href="/recipes"
          title="All recipes"
          textAlign="flex-end"
        />
        {isAuth ? (
          <DropdownList
            render={(isOpen, toggleShow, close) => (
              <DropdownDesktop
                toggle={toggleShow}
                isOpen={isOpen}
                userdId={userId}
                userInfo={isAuth}
              />
            )}
          />
        ) : isAuthPage ? null : (
          <ActionButton
            handleClick={access}
            customStyle={{
              background: '#06b4fe',
              marginLeft: '20px',
              color: '#fff',
              border: 'none',
              width: '100%',
              height: '36px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            Accedi
          </ActionButton>
        )}
      </div>
      <style jsx>{`
        .desktop-only {
          display: none;
        }

        .mobile-only {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        }

        @media (min-width: 700px) {
          .mobile-only {
            display: none;
          }

          .desktop-only {
            display: flex;
            max-height: 36px;
            justify-content: flex-end;
            align-items: center;
            height: 100%;
          }
        }
      `}</style>
    </Fragment>
  );
};
