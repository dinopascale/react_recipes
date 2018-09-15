import withFilter from '../hoc/withFilter';
import DropdownList from '../hoc/DropdownList';

import RecipeCard from './recipesList/RecipeCard';
import FilterListRow from './recipesList/FilterListRow';

const RecipesList = ({ recipes, sorted, sortBy }) => {
  return (
    <div className="recipes-list-container">
      <DropdownList
        render={(isOpen, toggleShow, close) => (
          <FilterListRow
            isOpen={isOpen}
            toggleShow={toggleShow}
            close={close}
            sorted={sorted}
            sortBy={sortBy}
          />
        )}
      />
      <div className="recipes-list">
        {recipes
          .sort(
            (a, b) =>
              sortBy === 'createdAt'
                ? new Date(b.createdAt) - new Date(a.createdAt)
                : b[sortBy] - a[sortBy]
          )
          .map(recipe => (
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

export default withFilter(RecipesList, 'avgRate');
