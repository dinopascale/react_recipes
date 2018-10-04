import DropdownList from '../../hoc/DropdownList';
import SortListRow from '../recipesList/SortListRow';

export default ({ sortBy }) => {
  return (
    <div className="sort-row">
      <DropdownList
        render={(isOpen, toggleShow, close) => (
          <div className="sort-row">
            <SortListRow
              isOpen={isOpen}
              toggleShow={toggleShow}
              close={close}
              sortBy={sortBy === 'totalRate' ? 'Most Popular' : 'Most Recent'}
              items={[
                {
                  value: 'Most Popular',
                  handleClick: event => this.props.sorted(event, 'totalRate')
                },
                {
                  value: 'Most Recent',
                  handleClick: event => this.props.sorted(event, 'createdAt')
                }
              ]}
            />
          </div>
        )}
      />
      <style jsx>{`
        .sort-row {
          padding: 20px 20px 10px 20px;
        }
      `}</style>
    </div>
  );
};
