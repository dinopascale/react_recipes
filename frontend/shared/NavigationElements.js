import { Fragment } from 'react';

import NavigationElement from './navigationElements/NavigationElement';
import LogoutButton from './navigationElements/LogoutButton';

export default props => {
  let content = null;

  if (props.isAuth) {
    content = (
      <Fragment>
        <NavigationElement to="/ne" title="New Recipe" />
        <NavigationElement to="/ed" title="Edit Account" />
        <LogoutButton />
      </Fragment>
    );
  }
  return (
    <div className="nav-elements">
      <NavigationElement to="/recipes" title="See all recipes" />
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
