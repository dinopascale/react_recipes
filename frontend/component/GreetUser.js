import Link from 'next/link';

export default ({ user }) => {
  return (
    <div className="greet-user-container">
      <Link prefetch as="/u/me" href={`/user?userId=${user._id}&isMe=true`}>
        <div className="avatar-container" />
      </Link>
      <div className="user-info-container">
        <h1 className="title">Hi, {user.username}!</h1>
        <p className="subtitle">Take a look at these awesome Recipes!</p>
      </div>
      <style jsx>{`
        .greet-user-container {
          margin: 0px auto 20px auto;
          width: 100%;
          border-radius: 4px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          position: relative;
        }

        .user-info-container {
            flex: 0 0 50%;
        }

        .avatar-container {
          flex: 0 0 35%;
          background: #f1f1f1 url("${user.avatar}") no-repeat center center;
          background-size: cover;
          border-radius: 5px;
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
          color: #fff;
        }

        .title {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};
