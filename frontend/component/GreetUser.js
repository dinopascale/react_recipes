export default ({ user }) => {
  return (
    <div className="greet-user-container">
      <div className="user-row">
        <div className="user-info-container">
          <h3 className="title">Hi, {user.username}!</h3>
          <p className="body-one subtitle">
            Take a look at these awesome Recipes!
          </p>
        </div>
      </div>

      <style jsx>{`
        .greet-user-container {
          margin: 0px auto 0px auto;
          width: 100%;
          border-radius: 4px;
        }

        .user-info-container {
            flex: 0 0 50%;
            width: 100%;
            overflow-wrap: break-word;
            word-wrap: break-word;
            hyphens: auto;
        }

        .user-row {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: flex-start;
        }

        .avatar-container {
          width: 60px;
          height: 60px;
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
          color: #26335e;
          font-weight: 900;
          margin-bottom: 10px;
        }

        .subtitle {
          color: #777e8e;
          margin-bottom: 10px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};
