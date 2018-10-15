import Link from 'next/link';
import ActionButton from '../shared/ActionButton';

export default ({ recipe, isAuthor, recipeToEdit, openDiscardModal }) => {
  return (
    <div className="single-recipe-container">
      <div className="recipe-img" />
      <div className="info-container">
        <div className="recipe-title-container">
          <h3 className="recipe-title">{recipe.name}</h3>

          <p className="recipe-author-container">
            by
            <Link
              prefetch
              as={isAuthor ? '/u/me' : `/u/${recipe._creator._id}`}
              href={
                isAuthor
                  ? `/user?userId=${recipe._creator._id}&isMe=true`
                  : `/user?userId=${recipe._creator._id}`
              }
            >
              <span className="recipe-author"> {recipe._creator.username}</span>
            </Link>
          </p>
        </div>

        {isAuthor ? (
          <div className="author-action-row">
            <ActionButton
              handleClick={openDiscardModal}
              customStyle={{
                flex: '0 0 15%',
                color: '#06b4fe'
              }}
            >
              Delete
            </ActionButton>
            <ActionButton
              handleClick={recipeToEdit}
              customStyle={{
                marginLeft: '16px',
                // color: '#06b4fe',
                background: '#06b4fe',
                color: '#fff',
                border: 'none',
                flex: '0 0 15%',
                height: '36px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              Edit
            </ActionButton>
          </div>
        ) : null}

        <div className="grid-simple-info">
          <div className="simple-info">
            <span className="label caption">Preparation Time</span>
            <p className="info body-one">{recipe.preparationTime} min</p>
          </div>
          <div className="simple-info">
            <span className="label caption">Cook Time</span>
            <p className="info body-one">{recipe.cookTime} min</p>
          </div>
          <div className="simple-info">
            <span className="label caption">Serves</span>
            <p className="info body-one">{recipe.serves}</p>
          </div>
          <div className="simple-info">
            <span className="label caption">Difficulty</span>
            <p className="info body-one">{recipe.difficulty}</p>
          </div>
          <div className="simple-info">
            <span className="label caption">Tag</span>
            <p className="info body-one">{recipe.tag}</p>
          </div>
        </div>

        <div className="recipe-ingredients">
          <p className="section-title caption">Ingredients</p>
          <ul className="ingredients">
            {recipe.ingredients.map(ing => (
              <li className="ingredient body-one" key={ing.name}>
                {ing.name} - {ing.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div className="directions-container">
          <p className="section-title caption">Directions</p>
          <p className="directions body-one">{recipe.directions}</p>
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
            max-width: 700px;
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
            color: #26335e;
            font-weight: 900;
        }

        .recipe-author-container {
            text-align: center;
            margin: 10px 0 0 0;
            color: #777;
        }

        .recipe-author {
            color: #06b4fe;
            font-weight: bold;
            cursor:pointer;
        }

        .author-action-row {
            display: none;
        }

        .grid-simple-info {
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
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
            color: #26335e;
            font-weight: 900;
            font-size: 13px;
        }

        .section-title {
            margin: 30px 0 0px 0;
        }

        .info, .ingredient {
            font-size: 15px;
            color: #777e8e;
            margin: 5px 0;
        }

        .recipe-ingredients, .directions-container {
            padding:0 8px;
        }

        .directions-container {
            word-wrap: break-word;
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
            line-height: 1.6;
            color: #777e8e;
        }

        @media (min-width: 700px) {
            .info-container {
                padding: 2px 36px;
            }

            .simple-info {
                flex: 0 0 33.3333%;
            }

            .ingredients {
                width: 50%;
            }

            .author-action-row {
                display: flex;
                flex-flow: row-nowrap;
                justify-content: flex-end;
                margin: 0px 0 32px 0;
                padding: 16px 0;
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
            }
        }

      `}</style>
    </div>
  );
};
