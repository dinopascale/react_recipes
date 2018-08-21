import { withRouter } from 'next/router';
import { Fragment } from 'react';

import ActionButton from '../../shared/ActionButton';

export default withRouter(props => {
  const auth = !!props.isAuth;
  let content = null;
  if (auth) {
    content = (
      <Fragment>
        <div className="user-img">
          <div
            className="avatar"
            style={{ backgroundImage: `url('${props.isAuth.avatar}')` }}
          />
          <div
            contentEditable={auth}
            html={props.value}
            onChange={props.changed}
            onInput={props.changed}
            className="new-comment"
            placeholder={'Write a comment...'}
          />
        </div>
        <div className="action-row">
          <ActionButton
            customStyle={{ color: 'rgb(119, 181, 255)', fontWeight: 'bold' }}
            handleClick={props.comment}
          >
            Publish
          </ActionButton>
        </div>
        <style jsx>{`
          .user-img {
            display: flex;
            flex-flow: row nowrap;
            align-items: flex-start;
          }

          .avatar {
            flex-grow: 1;
            flex-shrink: 0;
            background-position: center center;
            background-size: contain;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin: 10px 8px;
          }

          .new-comment {
            width: 100%;
            font-size: 14px;
            line-height: 1.6;
            padding: 10px 8px;
            outline: none;
            color: #000;
          }

          .new-comment:empty:before {
            content: attr(placeholder);
            display: block;
            color: #aaa;
          }

          .action-row {
            flex: 1 0 100%;
            padding-top: 20px;
            display: flex;
            justify-content: flex-end;
          }
        `}</style>
      </Fragment>
    );
  } else {
    content = (
      <ActionButton
        customStyle={{ flex: '0 0 80%', color: '#aaa' }}
        icon="comment"
        handleClick={() => props.router.push('/auth')}
      >
        Login to write a response
      </ActionButton>
    );
  }
  return (
    <div className="container">
      <div className="edit-area">{content}</div>
      <style jsx>{`
        .container {
          padding: 10px 20px;
          position: relative;
        }

        .edit-area {
          background-color: #fff;
          border: none;
          border-radius: 5px;
          min-height: 56px;
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          color: #aaa;
          padding: 10px 8px;
        }
      `}</style>
    </div>
  );
});
