import NavigationElements from '../shared/NavigationElements';
import Logo from './toolbar/Logo';
import ToggleButton from './toolbar/ToggleButton';

const Toolbar = props => (
  <div className="navbar">
    <ToggleButton openSideDrawer={props.opened} />
    <Logo />
    <nav className="desktop-only">
      <NavigationElements />
    </nav>
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

      .desktop-only {
        display: none;
        color: #fff;
      }

      @media (min-width: 499px) {
        .navbar {
          padding: 10px 110px;
        }

        .desktop-only {
          flex: 1 0 1;
          display: inherit;
        }
      }
    `}</style>
  </div>
);

export default Toolbar;
