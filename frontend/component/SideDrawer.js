import { Fragment } from 'react';

import Header from './sideDrawer/Header';
import NavigationElements from '../shared/NavigationElements';
import Backdrop from './sideDrawer/Backdrop';

export default props => {
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={props.open ? 'side-drawer open' : 'side-drawer close'}>
        <Header />
        <nav style={{ padding: '0 15px' }}>
          <NavigationElements />
        </nav>
      </div>
      <style jsx>{`
        .side-drawer {
          position: fixed;
          width: 280px;
          max-width: 70%;
          height: 100%;
          left: 0;
          top: 0;
          z-index: 200;
          background-color: white;
          box-sizing: border-box;
          transition: transform 0.4s ease-out;
        }

        @media (min-width: 499px) {
          .side-drawer {
            display: none;
          }
        }

        .open {
          transform: translate(0, 0);
          box-shadow: 1px 0px 10px rgba(0, 0, 0, 0.3);
        }

        .close {
          transform: translate(-100%, 0);
        }
      `}</style>
    </Fragment>
  );
};
