import Link from 'next/link';

export default ({ user }) => {
  return (
    <div className="greet-user-container">
      <div className="user-row">
        <Link prefetch as="/u/me" href={`/user?userId=${user._id}&isMe=true`}>
          <div className="avatar-container" />
        </Link>
        <h5 className="title">{user.username}!</h5>
      </div>
      <div>
        <p className="subtitle">Take a look at these awesome Recipes!</p>
      </div>
      <style jsx>{`
        .greet-user-container {
          margin: 0px auto 20px auto;
          width: 100%;
          border-radius: 4px;
        //   display: flex;
        //   flex-flow: row wrap;
        //   justify-content: space-between;
        //   position: relative;
        }

            // .user-info-container {
            //     flex: 0 0 50%;
            // }

        .user-row {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-items: center;
        }

        .avatar-container {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #f1f1f1 url("${user.avatar}") no-repeat center center;
          background-size: cover;
        }

        .avatar {
          width: 100%;
          max-height: 120px;
          border-radius: 50%;
          cursor: pointer;
        }

        .title,
        .subtitle {
          margin-top: 0;
        }

        .title {
          flex: 0 0 70%;
          color: #26335e;
          font-weight: 900;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};
