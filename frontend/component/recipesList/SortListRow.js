import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ isOpen, toggleShow, items, close, sortBy }) => {
  return (
    <div className="dropdown-menu-container">
      <div className="choice" onClick={toggleShow}>
        {sortBy}
        <span className="caret">
          <FontAwesomeIcon icon="caret-down" />
        </span>
      </div>
      {isOpen ? (
        <ul className="dropdown-menu">
          {items.map(item => (
            <li
              key={item.value}
              className="dropdown-menu-item"
              onClick={event => {
                close(event);
                item.handleClick();
              }}
            >
              {item.icon ? (
                <span className="option-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </span>
              ) : null}
              <span className="option-value">{item.value}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <style jsx>{`
        .dropdown-menu-container {
          position: relative;
          max-width: 150px;
          flex: 0 0 50%;
        }

        .choice {
          color: #fff;
          font-weight: bold;
          font-size: 14px;
          padding: 10px 0;
          margin: 0;
          width: 100%;
        }

        .caret {
          margin-left: 12px;
          max-width: 30px;
        }

        .dropdown-menu {
          position: absolute;
          background-color: #fff;
          width: 110%;
          display: inline-block;
          padding: 10px 0px;
          margin: 0;
          left: 0;
          border-radius: 4px;
          box-shadow: 0 4px 9px rgba(0, 0, 0, 0.439216);
          z-index: 200;
        }

        .dropdown-menu-item {
          list-style-type: none;
          width: 100%;
          font-size: 14px;
          padding: 8px 5px;
          color: #333;
          display: flex;
          align-items: center;
        }

        .option-icon {
          margin-left: 5px;
        }

        .option-value {
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
};
