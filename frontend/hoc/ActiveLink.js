import { withRouter } from 'next/router';

const ActiveLink = ({
  children,
  router,
  href,
  color,
  activeColor,
  focusColor
}) => {
  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={router.pathname === href ? 'active' : null}
    >
      {children}
      <style jsx>{`
        a {
          font-family: 'Open Sans', sans-serif;
          text-decoration: none;
          color: ${color || '#fff'};
          flex: 1 0 0;
          cursor: pointer;
          transition: all 0.3s ease-out;
        }
        a:hover,
        a:focus {
          color: ${focusColor || '#555'};
        }
        .active {
          color: ${activeColor || '#000'};
          font-weight: bold;
        }
        a.active:hover,
        a.active:focus {
          color: #ecf284;
        }
      `}</style>
    </a>
  );
};

export default withRouter(ActiveLink);
