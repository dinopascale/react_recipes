import RecipeCard from './recipesList/RecipeCard';

export default ({ recipes }) => (
  <div className="recipes-list">
    {recipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}
    <style jsx>{`
      .recipes-list {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
      }
    `}</style>
  </div>
);
