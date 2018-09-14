import { Fragment } from 'react';
import Link from 'next/link';

export default ({ isAuth }) => (
  <Fragment>
    <Link prefetch href={isAuth ? '/recipes' : '/'}>
      <a>
        <img src="/static/chef.png" alt="React Recipes Logo" />
      </a>
    </Link>
    <style jsx>
      {`
        a {
          flex: 1 0 0;
          max-width: 50px;
          text-align: right;
        }

        img {
          width: 100%;
        }

        @media (min-width: 499px) {
          a {
            text-align: left;
          }
        }
      `}
    </style>
  </Fragment>
);
