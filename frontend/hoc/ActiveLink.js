import { withRouter } from 'next/router';

const ActiveLink = ({ children, router, href }) => {
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
          color: #000;
          flex: 1 0 0;
          transition: all 0.3s ease-out;
        }
        a:hover,
        a:focus {
          color: #999;
        }
        .active {
          color: #118ab2;
          font-weight: bold;
        }
        a.active:hover,
        a.active:focus {
          color: #0e7192;
        }
      `}</style>
    </a>
  );
};

export default withRouter(ActiveLink);
