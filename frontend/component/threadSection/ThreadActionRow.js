import Link from 'next/link';

import FilterRow from './threadActionRow/FilterRow';
import ActionButton from '../../shared/ActionButton';

export default ({ listLength, sortBy, isAuth, showNew, sorted }) => (
  <div className="row-filter-new">
    <div className="filter">
      <FilterRow sortBy={sortBy} sorted={sorted} />
    </div>
    <div className="new-comment">
      {isAuth ? (
        <ActionButton
          handleClick={showNew}
          customStyle={{
            margin: '0',
            padding: '0 8px',
            width: '100%',
            height: '100%',
            backgroundColor: '#06b4fe',
            color: '#fff'
          }}
        >
          New Comment
        </ActionButton>
      ) : (
        <p className="message body-two">
          <Link prefetch href="/auth/register">
            <span className="link">Login </span>
          </Link>
          to comment
        </p>
      )}
    </div>
    <style jsx>{`
      .row-filter-new {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        height: 36px;
        padding: 0 20px;
        margin: 16px 0 24px 0;
      }

      filter {
        flex: 0 0 50%;
        text-align: left;
      }

      .new-comment {
        flex: 0 0 50%;
        text-align: right;
        height: 36px;
      }

      .message {
        margin: 0;
      }

      .link {
        color: #06b4fe;
        font-weight: bold;
        margin: 0;
      }
    `}</style>
  </div>
);
