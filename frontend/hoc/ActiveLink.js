import Link from 'next/link';
import { withRouter } from 'next/router';

const ActiveLink = ({
  children,
  router,
  href,
  as,
  color,
  activeColor,
  focusColor
}) => {
  return (
    <Link prefetch as={as} href={href}>
      <a className={router.asPath === (as || href) ? 'active' : null}>
        {children}
        <style jsx>{`
          a {
            font-family: 'Open Sans', sans-serif;
            text-decoration: none;
            color: ${color || '#fff'};
            flex: 1 0 0;
            cursor: pointer;
            transition: all 0.3s ease-out;
            padding: 0 6px;
            margin: 8px 0;
          }
          a:hover,
          a:focus {
            color: ${focusColor || '#555'};
          }
          .active {
            color: ${activeColor || '#000'};
            font-weight: bold;
            border-radius: 20px;
            background-color: rgba(6, 180, 254, 0.3);
            padding: 0 6px;
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
