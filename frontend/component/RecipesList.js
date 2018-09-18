import DropdownList from '../hoc/DropdownList';

import RecipeCard from './recipesList/RecipeCard';
import FilterListRow from './recipesList/FilterListRow';

const RecipesList = ({ recipes, byDate, byRate, sortBy }) => {
  return (
    <div className="recipes-list-container">
      <DropdownList
        render={(isOpen, toggleShow, close) => (
          <FilterListRow
            isOpen={isOpen}
            toggleShow={toggleShow}
            close={close}
            sortBy={sortBy}
            sortByDate={byDate}
            sortByRate={byRate}
          />
        )}
      />
      <div className="recipes-list">
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
      <style jsx>{`
        .recipes-list {
          padding: 15px 0px;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: flex-start;
        }
      `}</style>
    </div>
  );
};

export default RecipesList;
