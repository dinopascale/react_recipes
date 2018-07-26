import NavigationElements from '../../shared/NavigationElements';
import Logo from './header/Logo';
import ToggleButton from './header/ToggleButton';

const Header = props => (
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

export default Header;
