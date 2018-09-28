import { Fragment } from 'react';
import CallToAction from '../../shared/CallToAction';

export default props => {
  let content;
  if (props.user) {
    content = (
      <Fragment>
        {/* <div
          className="avatar-container"
          style={{ backgroundImage: `url(${props.user.avatar})` }}
        /> */}
        <div className="greet">
          <h4>{props.user.username}</h4>
        </div>
        <style jsx>{`
          .avatar-container {
            margin: 0 auto;
            width: 120px;
            height: 120px;
            border: 4px solid #fff;
            border-radius: 50%;
            background-color: #f1f1f1;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
          }

          .greet {
            position: absolute;
            bottom: -20px;
            width: 90%;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 5px;
            background: #f5f5f5;
            text-align: center;
            color: #000;
            font-family: 'Montserrat', sans-serif;
            padding: 5px 10px;
            font-size: 18px;
            align-self: flex-end;
          }

          .greet h4 {
            margin: 0;
          }
        `}</style>
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <h4>Ready to share your next recipe?</h4>
        <CallToAction href="/auth/login" small>
          Login
        </CallToAction>
        <style jsx>{`
          h4 {
            margin: 0 0 30px 0;
            font-size: 24px;
            line-height: 1.5;
          }
        `}</style>
      </Fragment>
    );
  }
  return (
    <div className="header">
      {content}
      <style jsx>{`
        .header {
          width: 100%;
          min-height: 150px;
          margin: 0 0 30px 0;
          ${props.user
            ? `background: url("${props.user.avatar}") no-repeat center center;`
            : null};
          background-size: cover;
          padding: 20px 15px;
          font-family: 'Open Sans', sans-serif;
          box-sizing: border-box;
          background-color: #ff7f50;
          color: #fff;
          position: relative;
        }
      `}</style>
    </div>
  );
};
