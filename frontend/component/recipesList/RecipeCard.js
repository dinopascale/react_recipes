export default ({ recipe }) => (
  <div className="recipe-card">
    <div className="recipe-card--header">{recipe.name}</div>
    <div className="recipe-card--image-container">
      <img className="recipe-card--image" src={recipe.img} />
    </div>
    <div className="recipe-card--info">
      <div className="recipe-card--info--element">
        <p className="recipe-card--info--element--label">Difficulty</p>
        {recipe.difficulty}
      </div>
      <div className="recipe-card--info--element">
        <p className="recipe-card--info--element--label">Prep. Time</p>
        {recipe.preparationTime}
      </div>
      <div className="recipe-card--info--element">
        <p className="recipe-card--info--element--label">Cook Time</p>
        {recipe.cookTime}
      </div>
      <div className="recipe-card--info--element">
        <p className="recipe-card--info--element--label">Tag</p>
        {recipe.tag}
      </div>
    </div>
    <style jsx>{`
      .recipe-card {
        flex: 1 0 100%;
        margin: 20px 0;
        box-sizing: border-box;
        border-radius: 2px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      }

      .recipe-card--header {
        padding: 20px;
        background-color: #ef476f;
        color: #fff;
      }

      .recipe-card--image-container {
        // border-top: 1px solid rgba(0, 0, 0, 0.1);
        // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        width: 100%;
        text-align: center;
      }

      .recipe-card--image {
        width: 100%;
      }

      .recipe-card--info {
        display: flex;
        flex-flow: row wrap;
        padding: 20px 10px;
      }
      .recipe-card--info--element {
        flex: 1 0 50%;
        padding: 5px 10px;
        box-sizing: border-box;
      }

      .recipe-card--info--element--label {
        font-size: 13px;
        font-weight: bold;
        color: #118ab2;
        margin: 4px 0;
      }
    `}</style>
  </div>
);
