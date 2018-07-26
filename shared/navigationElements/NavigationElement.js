import Link from 'next/link';
import { Fragment } from 'react';

export default ({ to, title }) => (
  <Fragment>
    <Link href={to}>
      <a>
        <p>{title}</p>
      </a>
    </Link>
    <style jsx>{`
      a {
        font-family: 'Open Sans', sans-serif;
        text-decoration: none;
        color: #000;
        flex: 1 0 0;
        margin: 0 8px;
      }
    `}</style>
  </Fragment>
);
