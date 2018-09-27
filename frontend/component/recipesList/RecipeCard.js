import Link from 'next/link';
import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImgWithSpinner from '../../hoc/ImgWithSpinner';
import Spinner from '../Spinner';
import dateInterval from '../../utils/dateIntervale';

class RecipeCard extends React.PureComponent {
  render() {
    const { recipe } = this.props;
    return (
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
          </div>
          <div className="recipe-info-container">
            <p className="recipe-info title">{recipe.name}</p>
            <div className="recipe-info rate-container">
              <p className="rate-value">{recipe.avgRate.toFixed(1)}</p>
              <span className="rate-icon">
                <FontAwesomeIcon icon="star" />
              </span>
            </div>
            <span className="recipe-date">
              {dateInterval(recipe.createdAt)}
            </span>
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
              color: #fff;
            }

            .recipe-info.rate-container {
              font-size: 12px;
              font-weight: normal;
              margin-top: 4px;
              display: flex;
              //   align-content: baseline;
              align-items: center;
              color: #fff;
            }

            .rate-value {
              margin: 0;
            }

            .rate-icon {
              font-size: 10px;
              margin: 0 5px;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .recipe-date {
              color: #fff;
              font-size: 12px;
              font-style: italic;
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
  }
}

export default RecipeCard;
