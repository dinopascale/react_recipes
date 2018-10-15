import NavigationElement from '../../../shared/navigationElements/NavigationElement';
import LogoutButton from '../../../shared/navigationElements/LogoutButton';

export default ({ isOpen, toggle, isAuth, userInfo }) => {
  let menu = null;

  if (isOpen) {
    menu = (
      <ul className="dropdown-menu">
        <li className="dropdown-menu-item body-one">
          <NavigationElement
            href="/new_recipe"
            title="New Recipe"
            icon="plus-circle"
            full
          />
        </li>
        <li className="dropdown-menu-item body-one">
          <NavigationElement
            href={`/user?userId=${userInfo._id}&isMe=true`}
            as="/u/me"
            title="My Account"
            icon="user-circle"
            full
          />
        </li>
        <li className="dropdown-menu-item body-one">
          <LogoutButton full />
        </li>
        <style jsx>{`
          .dropdown-menu {
            position: absolute;
            background-color: #fff;
            width: 200px;
            display: inline-block;
            padding: 8px 16px;
            top: 120%;
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
      <div className="avatar" onClick={toggle} />
      {menu}
      <style jsx>{`
        .dropdown-menu-container {
          position: relative;
          margin-left: 24px;
        }

        .avatar {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #cad1de url('${
              userInfo.avatar
            }') no-repeat center center;
            background-size: contain;
            cursor: pointer;
        }

        .icon {
          float: right;
        }
      `}</style>
    </div>
  );
};
