import { Fragment } from 'react';
import CallToAction from '../../shared/CallToAction';

export default props => {
  let content;
  if (props.user) {
    content = (
      <Fragment>
        <div
          className="avatar-container"
          style={{ backgroundImage: `url(${props.user.avatar})` }}
        />
        <div>
          <h4>Hello, {props.user.username}!</h4>
        </div>
        <style jsx>{`
          .avatar-container {
            margin: 0 auto;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
          }
        `}</style>
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <h4>Ready to share your next recipe?</h4>
        <CallToAction href="/auth" small>
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
          margin: 0 0 30px 0;
          padding: 35px 15px;
          font-family: 'Open Sans', sans-serif;
          box-sizing: border-box;
          background-color: #ef476f;
          color: #fff;
        }
      `}</style>
    </div>
  );
};
