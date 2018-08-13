import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => {
  console.log(props);
  const rateAvg = (props.rate / props.count).toFixed(1);
  return (
    <div
      className={
        props.isAuthor ? 'rating-container author' : 'rating-container'
      }
    >
      {!props.isAuthor ? (
        <div className="user-rate">
          <h4 className="label">Your Rate</h4>
          <span className="icon">
            <FontAwesomeIcon icon="star" color="#ffd166" />
            <p className="text-on-icon">{props.userRate}</p>
          </span>
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
          padding: 10px 20px;
          display: flex;
          flex-flow: row nowrap;
          align-items: baseline;
          position: relative;
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
          height: 100%;
        }

        .divider {
          width: 1px;
          background: #eee;
          min-height: 100%;
        }

        .label {
          flex: 1 0 100%;
          text-align: center;
          margin-bottom: 7px;
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
