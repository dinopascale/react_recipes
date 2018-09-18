import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({
  isOpen,
  toggleShow,
  close,
  sortBy,
  sortByDate,
  sortByRate
}) => {
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
          <li
            className="dropdown-menu-item"
            onClick={event => {
              close(event);
              sortByRate();
            }}
          >
            <span className="option-icon">
              <FontAwesomeIcon icon="gem" />
            </span>
            Most Popular
          </li>
          <li
            className="dropdown-menu-item"
            onClick={event => {
              close(event);
              sortByDate();
            }}
          >
            <span className="option-icon">
              <FontAwesomeIcon icon="clock" />
            </span>
            Most Recent
          </li>
        </ul>
      ) : null}
      <style jsx>{`
        .dropdown-menu-container {
          position: relative;
          max-width: 150px;
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
          width: 150%;
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
          margin: 0 10px 0 5px;
        }
      `}</style>
    </div>
  );
};
