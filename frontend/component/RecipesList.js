import DropdownList from '../hoc/DropdownList';

import RecipeCard from './recipesList/RecipeCard';
import SortListRow from './recipesList/SortListRow';

const RecipesList = ({ recipes, getRecipes, sortBy, filterBy }) => {
  return (
    <div className="recipes-list-container">
      <div className="recipe-list-options-container">
        <DropdownList
          render={(isOpen, toggleShow, close) => (
            <SortListRow
              isOpen={isOpen}
              toggleShow={toggleShow}
              close={close}
              sortBy={sortBy}
              items={[
                {
                  value: 'Most Popular',
                  handleClick: () =>
                    getRecipes(false, 'Most Popular', filterBy),
                  icon: 'gem'
                },
                {
                  value: 'Most Recent',
                  handleClick: () => getRecipes(false, 'Most Recent', filterBy),
                  icon: 'clock'
                }
              ]}
            />
          )}
        />
        <DropdownList
          render={(isOpen, toggleShow, close) => (
            <SortListRow
              isOpen={isOpen}
              toggleShow={toggleShow}
              close={close}
              sortBy={`Only ${filterBy}`}
              items={[
                {
                  value: 'Omnivore',
                  handleClick: () => getRecipes(false, sortBy, 'Omnivore')
                },
                {
                  value: 'Vegetarian',
                  handleClick: () => getRecipes(false, sortBy, 'Vegetarian')
                },
                {
                  value: 'Vegan',
                  handleClick: () => getRecipes(false, sortBy, 'Vegan')
                }
              ]}
            />
          )}
        />
      </div>
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

        .recipe-list-options-container {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default RecipesList;
