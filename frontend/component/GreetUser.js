import Link from 'next/link';

export default ({ user }) => {
  return (
    <div className="greet-user-container">
      <div className="avatar-container">
        <Link prefetch href="/u/me">
          <img src={user.avatar} className="avatar" />
        </Link>
      </div>
      <div className="user-info-container">
        <h1 className="title">Hi, {user.username}!</h1>
        <p className="subtitle">What would you like to do today?</p>
      </div>
      <style jsx>{`
        .greet-user-container {
          width: 100%;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: flex-start;
        }

        .user-info-container {
          flex: 0 0 60%;
        }

        .action-container {
          flex: 0 0 100%;
        }

        .avatar-container {
          flex: 0 0 35%;
        }

        .avatar {
          width: 100%;
          border-radius: 4px;
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
