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
          <div className="new-comment-container">
            <div className="username-container">
              <p className="username caption">{props.isAuth.username}</p>
            </div>
            <div
              contentEditable={auth}
              onKeyUp={props.changed}
              className="new-comment body-two"
              placeholder={
                auth ? 'Write a comment...' : 'Login to write a comment'
              }
            />
            <div className="action-row">
              <ActionButton
                customStyle={{ color: 'rgb(16, 174, 178)', fontWeight: 'bold' }}
                handleClick={props.comment}
                disabled={props.value === ''}
              >
                Publish
              </ActionButton>
            </div>
          </div>
        </div>
        <style jsx>{`
          .user-img {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: flex-start;
          }

          .avatar {
            flex: 0 0 15%;
            background-position: center center;
            background-size: contain;
            background-repeat: no-repeat;
            width: 36px;
            height: 36px;
            border-radius: 50%;
          }

          .new-comment-container {
            flex: 0 0 82%;
            display: flex;
            flex-flow: column;
            background: #ebedf0;
            padding: 6px 0px 0px 8px;
            border-radius: 0 8px 8px 0;
          }

          .username {
            padding-bottom: 4px;
            margin: 0;
            color: #000;
            font-weight: bold;
          }

          .new-comment {
            line-height: 1.6;
            padding-right: 16px;
            outline: none;
            color: #000;
            position: relative;
          }

          .new-comment:empty:after {
            content: attr(placeholder);
            position: absolute;
            width: 100%;
            height: 100%;
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
        customStyle={{ flex: '0 0 100%', color: '#777e8e', maxWidth: '100%' }}
        icon="comment"
        handleClick={() => props.router.push('/auth/register')}
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
          border-bottom: 1px solid #eee;
        }

        .edit-area {
          background-color: #fff;
          //   border: 1px solid;
          border-radius: 5px;
          min-height: 56px;
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          //   padding: 8px 16px;
          color: #aaa;
        }
      `}</style>
    </div>
  );
});
