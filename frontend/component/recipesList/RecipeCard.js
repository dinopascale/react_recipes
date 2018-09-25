import Link from 'next/link';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImgWithSpinner from '../../hoc/ImgWithSpinner';
import Spinner from '../Spinner';

export default ({ recipe }) => (
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
        <p className="recipe-info rate">
          <span>{recipe.avgRate.toFixed(1)}</span>
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
