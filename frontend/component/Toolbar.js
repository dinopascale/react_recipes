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
        display: flex;
        justify-content: space-between;
        flex: 1 0 0;
        padding: 10px 20px;
        background-color: #ffe4c4;
      }

      .desktop-only {
        display: none;
      }

      @media (min-width: 499px) {
        .desktop-only {
          flex: 1 0 1;
          display: inherit;
        }
      }
    `}</style>
  </div>
);

export default Toolbar;
