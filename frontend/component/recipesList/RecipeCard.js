import Link from 'next/link';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImgWithSpinner from '../../hoc/ImgWithSpinner';
import Spinner from '../Spinner';

export default ({ recipe }) => (
  //   <div className="recipe-card">
  //     <div className="recipe-card--header">
  //       <div
  //         className="recipe-card--header-avatar"
  //         style={{ backgroundImage: `url('${recipe._creator.avatar}')` }}
  //       />
  //       <div className="recipe-card--header-text">
  //         <p className="recipe-card--header-title">{recipe.name}</p>
  //         <p className="recipe-card--header-subtitle">
  //           <span className="recipe-card--header-icon-rate">
  //             <FontAwesomeIcon icon={faStar} />
  //           </span>
  //           <span className="recipe-card--header-avg">
  //             {recipe.rateCount === 0
  //               ? '0'
  //               : (recipe.rateValue / recipe.rateCount).toFixed(1)}
  //           </span>
  //           <span className="recipe-card--header-total">
  //             ({recipe.rateCount})
  //           </span>
  //         </p>
  //       </div>
  //     </div>
  //     <div className="recipe-card--image-container">
  //       <Link as={`/r/${recipe._id}`} href={`/recipe?id=${recipe._id}`}>
  //         <a>
  //           <img className="recipe-card--image" src={recipe.img} />
  //         </a>
  //       </Link>
  //     </div>
  //     <div className="recipe-card--info">
  //       <div className="recipe-card--info--element">
  //         <span className="recipe-card--info--element--label">Difficulty</span>
  //         <p className="recipe-card--info--element--info">{recipe.difficulty}</p>
  //       </div>
  //       <div className="recipe-card--info--element">
  //         <span className="recipe-card--info--element--label">Prep. Time</span>
  //         <p className="recipe-card--info--element--info">
  //           {recipe.preparationTime}
  //         </p>
  //       </div>
  //       <div className="recipe-card--info--element">
  //         <span className="recipe-card--info--element--label">Cook Time</span>
  //         <p className="recipe-card--info--element--info">{recipe.cookTime}</p>
  //       </div>
  //       <div className="recipe-card--info--element">
  //         <span className="recipe-card--info--element--label">Tag</span>
  //         <p className="recipe-card--info--element--info">{recipe.tag}</p>
  //       </div>
  //     </div>
  //     <style jsx>{`
  //       .recipe-card {
  //         flex: 1 0 100%;
  //         margin: 20px 0;
  //         box-sizing: border-box;
  //         border-radius: 2px;
  //         box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  //       }

  //       .recipe-card--header {
  //         padding: 20px;
  //         background-color: #ffe4c4;
  //         color: #444;
  //         font-weight: bold;
  //         display: flex;
  //       }

  //       .recipe-card--header-avatar {
  //         max-width: 50px;
  //         max-height: 50px;
  //         flex: 1 0 20%;
  //         margin-right: 15px;
  //         background-position: center bottom;
  //         background-size: contain;
  //         background-repeat: no-repeat;
  //         background-color: #fff;
  //         border-radius: 50%;
  //       }

  //       .recipe-card--header-text {
  //         height: 100%;
  //         flex: 1 0 80%;
  //       }

  //       .recipe-card--header-title {
  //         font-size: 18px;
  //         margin-top: 0;
  //         margin-bottom: 10px;
  //       }

  //       .recipe-card--header-subtitle {
  //         margin-top: 0;
  //         margin-bottom: 0;
  //         font-size: 12px;
  //       }

  //       .recipe-card--header-icon-rate {
  //         margin: 0 4px 0 0;
  //         line-height: 1;
  //       }

  //       .recipe-card--header-avg {
  //         margin: 0 4px;
  //       }

  //       .recipe-card--header-total {
  //         margin: 0px;
  //       }

  //       .recipe-card--image-container {
  //         cursor: pointer;
  //         width: 100%;
  //         text-align: center;
  //       }

  //       .recipe-card--image {
  //         width: 100%;
  //       }

  //       .recipe-card--info {
  //         display: flex;
  //         flex-flow: row wrap;
  //         padding: 20px 10px;
  //       }
  //       .recipe-card--info--element {
  //         flex: 1 0 50%;
  //         padding: 5px 10px;
  //         box-sizing: border-box;
  //       }

  //       .recipe-card--info--element--label {
  //         font-size: 13px;
  //         font-weight: bold;
  //         color: #10aeb2;
  //         margin: 4px 0;
  //       }

  //       .recipe-card--info--element--info {
  //         font-size: 15px;
  //         margin-top: 5px;
  //       }
  //     `}</style>
  //   </div>
  <Link prefetch as={`/r/${recipe._id}`} href={`/recipe?id=${recipe._id}`}>
    <div className="recipe-card">
      <div className="recipe-img-container">
        <ImgWithSpinner
          render={(state, error, loading) => {
            return (
              <Fragment>
                {state.loading ? <Spinner type="contain" /> : null}
                <img
                  src={state.error ? '/static/no-img.png' : recipe.img}
                  onLoad={loading}
                  onError={error}
                  className="recipe-img"
                />
              </Fragment>
            );
          }}
        />
        {/* //   <img src={recipe.img} className="recipe-img" /> */}
      </div>
      <div className="recipe-info-container">
        <p className="recipe-info title">{recipe.name}</p>
        <p className="recipe-info rate">
          <span>{recipe.avgRate}</span>
          <span className="rate-icon">
            <FontAwesomeIcon icon="star" />
          </span>
        </p>
      </div>
      <style jsx>{`
      .recipe-card {
        flex: 0 0 47%;
        margin-bottom: 10px;
        display: flex;
        flex-flow: column;
      }

      .recipe-img-container {
          min-height: 75px;
          position: relative;
      }

      .recipe-img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }

      .recipe-info-container {
        position: relative;
        top: -5px;
        border-radius: 0px 0px 4px 4px;
        padding: 8px 6px 12px 6px;
      }

      .recipe-info {
        margin: 0;
        font-size: 14px;
        font-weight: bold;
        color:#fff;
      }

      .recipe-info.rate {
        font-size: 12px;
        font-weight: normal;
        margin-top: 4px;
        display: flex;
        align-items: center;
        color:#fff;
      }

      .rate-icon {
        vertical-align: middle
        font-size: 10px;
        margin-left: 5px;
      }

      @media (min-width: 499px) {
        .recipe-card {
            flex: 0 0 30%;
        }
      }
    `}</style>
    </div>
  </Link>
);
