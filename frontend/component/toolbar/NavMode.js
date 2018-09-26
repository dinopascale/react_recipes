import { Fragment } from 'react';

import ToggleButton from './navMode/ToggleButton';
import Logo from './navMode/Logo';
import NavigationElements from '../../shared/NavigationElements';

export default props => (
  <Fragment>
    <ToggleButton openSideDrawer={props.opened} />
    <Logo isAuth={props.isAuth} />
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
