import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CallToAction from '../../shared/CallToAction';

export default props => {
  const rateAvg = (props.rate / props.count).toFixed(1);

  let content = (
    <div className="cta-container">
      <p className="cta-text">Subscribe or Login to rate this recipe!</p>
      <CallToAction small href="/auth">
        Go
      </CallToAction>
      <style jsx>{`
        .cta-container {
          text-align: center;
          padding: 0 7px;
        }

        .cta-text {
          font-size: 14px;
          margin-bottom: 25px;
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
          <h4 className="label">Your Rate</h4>
          {content}
        </div>
      ) : null}
      <div className="overall-rate">
        <h4 className="label">Overall Rate</h4>
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
          padding: 20px;
          display: flex;
          flex-flow: row nowrap;
          align-items: baseline;
          position: relative;
          background: #fff;
          width: 95%;
          margin: 0 auto;
          border-radius: 0 0 5px 5px;
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
          flex: 1 0 50%;
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
          margin-bottom: 0px;
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
