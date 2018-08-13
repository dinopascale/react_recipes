export default props => (
  <div className="dropdown">
    <ul className="dropdown-list">
      {props.items.map(item => (
        <li
          onClick={item.handleClick}
          className="dropdown-list-element"
          key={item.value}
        >
          {item.value}
        </li>
      ))}
    </ul>
    <style jsx>{`
      .dropdown {
        position: absolute;
        right: 0px;
        margin-top: 0px;
        width: 180px;
        background-color: #eee;
        border-radius: 2px;
        z-index: 100;
      }

      .dropdown-list {
        padding: 0;
        list-style: none;
        margin: 0;
      }

      .dropdown-list-element {
        padding: 10px 15px;
        background-color: #eee;
        cursor: pointer;
        font-size: 13px;
      }

      .dropdown-list-element:hover {
        background-color: #ddd;
      }
    `}</style>
  </div>
);
