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
      <NavigationElement href="/recipes" title="See all recipes" icon="globe" />
      {content}
      <style jsx>{`
        .nav-elements {
          display: flex;
          flex-flow: column;
        }

        @media (min-width: 499px) {
          .nav-elements {
            flex-flow: row;
          }
        }
      `}</style>
    </div>
  );
};
