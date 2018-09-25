import Link from 'next/link';

export default ({ recipe }) => {
  return (
    <div className="single-recipe-container">
      <div className="recipe-img" />
      <div className="info-container">
        <div className="recipe-title-container">
          <h1 className="recipe-title">{recipe.name}</h1>

          <p className="recipe-author-container">
            by
            <Link
              prefetch
              as={`/u/${recipe._creator._id}`}
              href={`/user?userId=${recipe._creator._id}`}
            >
              <span className="recipe-author"> {recipe._creator.username}</span>
            </Link>
          </p>
        </div>

        <div className="grid-simple-info">
          <div className="simple-info">
            <span className="label">Preparation Time</span>
            <p className="info">{recipe.preparationTime} min</p>
          </div>
          <div className="simple-info">
            <span className="label">Cook Time</span>
            <p className="info">{recipe.cookTime} min</p>
          </div>
          <div className="simple-info">
            <span className="label">Serves</span>
            <p className="info">{recipe.serves}</p>
          </div>
          <div className="simple-info">
            <span className="label">Difficulty</span>
            <p className="info">{recipe.difficulty}</p>
          </div>
          <div className="simple-info">
            <span className="label">Tag</span>
            <p className="info">{recipe.tag}</p>
          </div>
        </div>

        <div className="recipe-ingredients">
          <p className="section-title">Ingredients</p>
          <ul className="ingredients">
            {recipe.ingredients.map(ing => (
              <li className="ingredient" key={ing.name}>
                {ing.name} - {ing.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="directions-container">
          <p className="section-title">Directions</p>
          <p className="directions">{recipe.directions}</p>
        </div>
      </div>
      <style jsx>{`
        .single-recipe-container {
          width: 100%;
          height: 100%;
        }

        .recipe-img {
            background: url("${recipe.img}") no-repeat center center;
            background-size: cover;
            width: 100%;
            min-height: 250px;
        }

        .info-container {
            background: #fff;
            width: 95%;
            margin: 0 auto;
            padding: 2px 8px;
        }

        .recipe-title-container {
            text-align: center;
            position: relative;
            top: -30px;
            background: #fff;
            border-radius: 5px 5px 0 0;
            padding-top: 8px;
            // width: 80%;
            margin: 0 auto;
        }

        .recipe-title {
            margin: 0;
        }

        .recipe-author-container {
            text-align: center;
            margin: 10px 0 0 0;
            color: #777;
        }

        .recipe-author {
            color: rgb(16, 174, 178);
            font-weight: bold;
            cursor:pointer;
        }


        .grid-simple-info {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
        }

        .simple-info {
            flex: 1 0 45%;
            display: flex;
            flex-flow: column;
            text-align: center;
            // border-bottom: 1px solid #eee;
            padding: 15px 0;
        }

        .label, .section-title {
            color: #444;
            font-weight: bold;
            font-size: 13px;
        }

        .section-title {
            margin: 30px 0 0px 0;
        }

        .info, .ingredient {
            font-size: 15px;
            margin: 5px 0;
        }

        .recipe-ingredients, .directions-container {
            padding:0 8px;
        }

        .ingredients {
            margin: 5px 0;
            // padding: 0 10px;
            padding:0;
        }

        .ingredient {
            list-style-type: none;
            padding: 8px 0;
            border-bottom: 1px solid #ccc;
        }

        .directions {
            margin-top: 5px;
            font-size: 15px;
            line-height: 1.6;
        }

      `}</style>
    </div>
  );
};
