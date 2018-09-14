import Link from 'next/link';
import { withRouter } from 'next/router';

const ActiveLink = ({
  children,
  router,
  href,
  color,
  activeColor,
  focusColor
}) => {
  return (
    <Link prefetch href={href}>
      <a className={router.pathname === href ? 'active' : null}>
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
    </Link>
  );
};

export default withRouter(ActiveLink);
