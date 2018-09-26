import Link from 'next/link';

import dateInterval from '../../../utils/dateIntervale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ recipe }) => (
  <Link prefetch as={`/r/${recipe._id}`} href={`/recipe?id=${recipe._id}`}>
    <div className="user-recipe">
      <div className="recipe-img-container" />
      <div className="recipe-info-container">
        <div className="recipe-name-container">
          <p className="recipe-name">{recipe.name}</p>
          <div className="recipe-rate-row">
            <p className="recipe-rate">
              {recipe.rateCount !== 0
                ? (recipe.rateValue / recipe.rateCount).toFixed(1)
                : 0}
            </p>
            <span className="icon">
              <FontAwesomeIcon icon="star" />
            </span>
          </div>
        </div>
        <div className="recipe-date-container">
          <p className="created">{dateInterval(recipe.createdAt)}</p>
        </div>
      </div>
      <style jsx>{`
      .user-recipe {
        flex: 0 0 100%;
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        cursor: pointer;
      }

      .recipe-img-container {
          flex: 0 0 55%;
          background: url("${recipe.img}") no-repeat center center;
          background-size: cover;
          width: 100%;
          height: 90px;
      }

      .recipe-info-container {
          flex: 0 0 40%;
          display: flex;
          flex-flow: column;
      }

      .recipe-name-container {
          flex: 1 0 0;
      }

      .recipe-name {
          margin: 0;
          font-size: 15px;
          font-weight: bold;
      }

      .recipe-rate-row {
          display: flex;
          align-content: baseline;
          font-size: 13px;
      }

      .recipe-rate {
          margin: 3px 0;
          color: #999;
      }

      .icon {
          margin-left: 5px;
          font-size: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #999;
      }

      .recipe-date-container {
          display: flex;
          align-items: flex-end;  
      }

      .created {
          margin: 5px 0 0 0;
          font-size: 14px;
          color: #999;
      }
    `}</style>
    </div>
  </Link>
);
