import { Fragment } from 'react';

import Header from './sideDrawer/Header';
import NavigationElements from '../shared/NavigationElements';
import Backdrop from './sideDrawer/Backdrop';

export default props => {
  const ifLink = e => {
    // INSIDE SIDEDRAWER WE HAVE NAV LINKS IN FORM OF <p> and <button> HTML ELEMENTS.
    // WITH THIS METHOD, WE CLOSE THE SDRAWER AFTER THESE NAV LINKS WERE CLICKED AND PAGE CHANGE
    const tag = e.target.tagName;
    if (tag === 'A' || tag === 'BUTTON' || tag === 'P') {
      return props.closed();
    }
    return false;
  };
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div
        className={props.open ? 'side-drawer open' : 'side-drawer close'}
        onClick={event => ifLink(event)}
      >
        <Header ctaHandler={props.closed} user={props.user} />
        <nav style={{ padding: '0 15px' }}>
          <NavigationElements
            isAuth={!!props.user}
            userId={props.user ? props.user._id : null}
          />
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
          z-index: 1200;
          background-color: #fff;
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
