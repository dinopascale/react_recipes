import { Fragment } from 'react';

import ToggleButton from './navMode/ToggleButton';
import Logo from './navMode/Logo';
import NavigationElements from '../../shared/NavigationElements';
import ActionButton from '../../shared/ActionButton';

export default props => (
  <Fragment>
    <ToggleButton openSideDrawer={props.opened} />
    {props.isAuth || props.isAuthPage ? (
      <Logo isAuth={props.isAuth} />
    ) : (
      <ActionButton
        handleClick={props.access}
        customStyle={{
          backgroundColor: '#fff',
          color: '#06b4fe'
        }}
      >
        Accedi
      </ActionButton>
    )}
    <nav className="desktop-only">
      <NavigationElements userId={props.userId} />
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
