import DropdownList from '../../../hoc/DropdownList';
import SortListRow from '../../recipesList/SortListRow';

export default ({ sortBy, sorted }) => {
  return (
    <div>
      <DropdownList
        render={(isOpen, toggleShow, close) => (
          <SortListRow
            isOpen={isOpen}
            toggleShow={toggleShow}
            close={close}
            sortBy={sortBy === 'totalRate' ? 'Most Popular' : 'Most Recent'}
            items={[
              {
                value: 'Most Popular',
                handleClick: event => sorted(event, 'totalRate')
              },
              {
                value: 'Most Recent',
                handleClick: event => sorted(event, 'createdAt')
              }
            ]}
          />
        )}
      />
    </div>
  );
};
