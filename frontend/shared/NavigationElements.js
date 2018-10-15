import { Fragment } from 'react';

import NavigationElement from './navigationElements/NavigationElement';
import LogoutButton from './navigationElements/LogoutButton';

export default props => {
  let content = null;

  if (props.isAuth) {
    content = (
      <Fragment>
        <NavigationElement
          href="/new_recipe"
          title="New Recipe"
          icon="plus-circle"
        />
        <NavigationElement
          href={`/user?userId=${props.userId}&isMe=true`}
          as="/u/me"
          title="My Account"
          icon="user-circle"
        />
        <LogoutButton />
      </Fragment>
    );
  }
  return (
    <div className="nav-elements">
      <NavigationElement href="/recipes" title="All recipes" icon="globe" />
      {content}
      <style jsx>{`
        .nav-elements {
          display: flex;
          flex-flow: column;
          max-width: 800px;
        }

        @media (min-width: 499px) {
          .nav-elements {
            flex-flow: row;
            justify-content: flex-end;
            max-height: 36px;
            flex: 0 0 100%;
          }
        }

        @media (min-width: 700px) {
          .nav-elements {
            flex: 0 0 80%;
          }
        }

        @media (min-width: 900px) {
          .nav-elements {
            flex: 0 0 60%;
          }
        }
      `}</style>
    </div>
  );
};
