export default props => {
  return (
    <div className="filter-row">
      <div className="select-menu">
        <select className="select-menu" onChange={props.selected}>
          {props.options.map(option => (
            <option value={option.label} key={option.label}>
              {option.value}
            </option>
          ))}
        </select>
      </div>
      <style jsx>{`
        .filter-row {
          padding: 20px 20px 10px 20px;
          display: flex;
          font-size: 14px;
        }

        .select-menu {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          border: none;
          padding: 0px 15px 0px 3px;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          font-weight: bold;
          color: #fff;
          text-transform: uppercase;
          background: transparent;
          outline: none;
          position: relative;
        }

        .select-menu:after {
          content: '\f0d7';
          font-family: 'FontAwesome';
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
        }

        .select-menu option {
          padding: 10px !important;
        }

        .select-menu::-ms-expand {
          display: none;
        }
      `}</style>
    </div>
  );
};
