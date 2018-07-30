import Link from 'next/link';

import toSlug from '../../utils/toSlug';

export default ({ recipe }) => (
  <div className="recipe-card">
    <div className="recipe-card--header">{recipe.name}</div>
    <div className="recipe-card--image-container">
      <Link as={`/r/${recipe._id}`} href={`/recipe?id=${recipe._id}`}>
        <a>
          <img className="recipe-card--image" src={recipe.img} />
        </a>
      </Link>
    </div>
    <div className="recipe-card--info">
      <div className="recipe-card--info--element">
        <span className="recipe-card--info--element--label">Difficulty</span>
        <p className="recipe-card--info--element--info">{recipe.difficulty}</p>
      </div>
      <div className="recipe-card--info--element">
        <span className="recipe-card--info--element--label">Prep. Time</span>
        <p className="recipe-card--info--element--info">
          {recipe.preparationTime}
        </p>
      </div>
      <div className="recipe-card--info--element">
        <span className="recipe-card--info--element--label">Cook Time</span>
        <p className="recipe-card--info--element--info">{recipe.cookTime}</p>
      </div>
      <div className="recipe-card--info--element">
        <span className="recipe-card--info--element--label">Tag</span>
        <p className="recipe-card--info--element--info">{recipe.tag}</p>
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
        cursor: pointer;
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

      .recipe-card--info--element--info {
        font-size: 15px;
        margin-top: 5px;
      }
    `}</style>
  </div>
);
