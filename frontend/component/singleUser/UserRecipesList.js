import UserRecipe from './userRecipesList/UserRecipe';

export default ({ recipeList }) => (
  <div className="user-recipe-list">
    {recipeList
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(recipe => (
        <UserRecipe recipe={recipe} key={recipe._id} />
      ))}
    <style jsx>{`
      .user-recipe-list {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
      }

      .recipe-img {
        width: 100%;
        border-radius: 4px;
        max-height: 150px;
      }

      recipe-info-container {
      }
    `}</style>
  </div>
);
