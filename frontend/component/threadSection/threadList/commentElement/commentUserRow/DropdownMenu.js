import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => {
  let menu = null;

  if (props.isOpen) {
    menu = (
      <ul className="dropdown-menu">
        <li className="dropdown-menu-item body-one" onClick={props.toEdit}>
          Edit
        </li>
        <li className="dropdown-menu-item body-one" onClick={props.toDelete}>
          Delete
        </li>
        <style jsx>{`
          .dropdown-menu {
            position: absolute;
            background-color: #fff;
            width: 130%;
            display: inline-block;
            padding: 8px 16px;
            top: 60%;
            margin: 0;
            right: -8px;
            border-radius: 8px;
            box-shadow: 0 4px 9px rgba(0, 0, 0, 0.439216);
            z-index: 200;
          }

          .dropdown-menu-item {
            list-style-type: none;
            width: 100%;
            height: 48px;
            font-size: 14px;
            padding: 8px 5px;
            color: #777e8e;
            display: flex;
            align-items: center;
          }
        `}</style>
      </ul>
    );
  }

  return (
    <div className="dropdown-menu-container">
      <span className="icon" onClick={props.toggle}>
        <FontAwesomeIcon icon="ellipsis-v" color="#919bb0" />
      </span>
      {menu}
      <style jsx>{`
        .dropdown-menu-container {
          position: relative;
          height: 100%;
        }

        .icon {
          float: right;
        }
      `}</style>
    </div>
  );
};
