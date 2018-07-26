import NavigationElement from './navigationElements/NavigationElement';

export default () => (
  <div className="nav-elements">
    <NavigationElement to="/recipes" title="Recipes" />
    <NavigationElement to="/recipes" title="Recipes#2" />
    <NavigationElement to="/recipes" title="Recipes#3" />
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
