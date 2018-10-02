import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => {
  const rateAvg = props.count === 0 ? 0 : (props.rate / props.count).toFixed(1);

  let content = (
    <div className="cta-container">
      <p className="cta-text body-two">
        <Link prefetch href="/auth/register">
          <a className="link">Subscribe </a>
        </Link>
        or
        <Link prefetch href="/auth/login">
          <a className="link"> Login </a>
        </Link>
        to rate this recipe!
      </p>
      <style jsx>{`
        .cta-container {
          text-align: center;
          padding: 0 7px;
        }

        .cta-text {
          font-size: 14px;
          color: #777e8e;
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .link {
          color: #06b4fe;
          font-weight: bold;
          text-decoration: none;
        }
      `}</style>
    </div>
  );

  if (props.isAuth) {
    content = (
      <span className="icon">
        <FontAwesomeIcon icon="star" color="#ffd166" />
        <p className="text-on-icon">{props.userRate}</p>
        <style jsx>{`
          .icon {
            font-size: 76px;
            position: relative;
          }

          .text-on-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            margin: 0;
            font-size: 26px;
            transform: translate(-50%, -50%);
          }
        `}</style>
      </span>
    );
  }

  return (
    <div
      className={
        props.isAuthor ? 'rating-container author' : 'rating-container'
      }
    >
      {!props.isAuthor ? (
        <div className="user-rate">
          <h5 className="label">Your Rate</h5>
          {content}
        </div>
      ) : null}
      <div className="overall-rate">
        <h5 className="label">Overall Rate</h5>
        <span className="icon">
          <FontAwesomeIcon icon="star" color="#ffd166" />
          <p className="text-on-icon">{rateAvg}</p>
        </span>
        <div className="text">
          <p className="count">
            <em>{props.count} votes</em>
          </p>
        </div>
      </div>
      <style jsx>{`
        .rating-container,
        .rating-container.author {
          padding: 20px 20px 40px 20px;
          display: flex;
          flex-flow: row nowrap;
          align-items: baseline;
          justify-content: space-between;
          position: relative;
          background: #fff;
          width: 95%;
          margin: 0 auto;
        }

        .rating-container:before {
          content: '';
          position: absolute;
          height: 100%;
          width: 1px;
          background: #eee;
          top: 0;
          left: 50%;
        }

        .rating-container.author:before {
          display: none;
        }

        .overall-rate,
        .user-rate {
          flex: 0 0 45%;
          display: flex;
          flex-flow: row wrap;
          align-items: flex-start;
          justify-content: center;
          min-height: 100%;
          position: relative;
        }

        .divider {
          width: 1px;
          background: #eee;
          min-height: 100%;
        }

        .label {
          flex: 1 0 100%;
          text-align: center;
          margin-bottom: 6px;
          color: #26335e;
          font-weight: 900;
        }

        .icon {
          font-size: 76px;
          position: relative;
        }

        .text-on-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          margin: 0;
          font-size: 26px;
          transform: translate(-50%, -50%);
        }

        .text {
          flex: 1 0 100%;
          text-align: center;
        }
        .count {
          margin: 1px 0 0 0;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};
