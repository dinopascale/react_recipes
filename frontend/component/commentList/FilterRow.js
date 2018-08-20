export default props => (
  <div className="filter-row">
    <span>Sort by</span>
    <select onChange={props.selected}>
      {props.options.map(option => (
        <option value={option.label} key={option.label}>
          {option.value}
        </option>
      ))}
    </select>
    <style jsx>{`
      .filter-row {
        padding: 10px 20px;
      }
    `}</style>
  </div>
);
