import UserStatistics from './singleUser/UserStatistics';
import UserRecipesList from './singleUser/UserRecipesList';

export default ({ user, recipes, comments, rates, isLoading }) => (
  <div className="user-info-container">
    <div className="avatar-container" />
    <div className="user-username-container">
      <h1 className="username">{user.username}</h1>
    </div>
    <div className="user-bio-container">
      <h4 />
      <p className="bio">{user.bio || 'No bio avaible'}</p>
    </div>
    <UserStatistics
      rates={rates}
      comments={comments}
      recipes={recipes ? recipes.length : 0}
      isLoading={isLoading}
    />
    <UserRecipesList recipeList={recipes ? recipes : []} />
    <style jsx>{`
      .user-info-container {
        margin: 150px auto 20px auto;
        width: 95%;
        min-height: 100%;
        background: #fff;
        border-radius: 4px;
        padding: 2px 16px;
        position: relative;
      }

      .avatar-container {
        width: 130px;
        height: 130px;
        margin: 0 auto;
        position: absolute;
        top: -75px;
        left: 50%;
        transform: translateX(-50%);
        border: 4px solid #fff;
        border-radius: 50%;
        background: #999 url("${user.avatar}") no-repeat center center;
        background-size: cover;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
      }

      .avatar {
        width: 100%;
        max-height: 120px;
        border-radius: 50%;
      }

      .user-username-container {
        text-align: center;
        margin-top: 66px;
      }

      .username {
        font-size: 26px;
      }

      .user-bio-container {
      }

      .bio {
        color: #888;
        font-style: italic;
        line-height: 1.6;
      }
    `}</style>
  </div>
);
