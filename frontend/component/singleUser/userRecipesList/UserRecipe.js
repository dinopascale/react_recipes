import Link from 'next/link';

import dateInterval from '../../../utils/dateIntervale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ recipe }) => (
  <Link prefetch as={`/r/${recipe._id}`} href={`/recipe?id=${recipe._id}`}>
    <div className="user-recipe">
      <div
        className={
          recipe.sharable
            ? 'recipe-img-container'
            : 'recipe-img-container draft'
        }
      />
      <div className="recipe-info-container">
        <div className="recipe-name-container">
          <p className="recipe-name body-one">{recipe.name}</p>
        </div>
        <div className="recipe-rate-row">
          <p className="recipe-rate caption">
            {recipe.rateCount !== 0
              ? (recipe.rateValue / recipe.rateCount).toFixed(1)
              : 0}
          </p>
          <span className="icon">
            <FontAwesomeIcon icon="star" />
          </span>
        </div>
        <div className="recipe-date-container">
          <p className="created caption">{dateInterval(recipe.createdAt)}</p>
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
          position: relative;
      }

      .recipe-img-container.draft:before {
        content: "Draft";
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left:0;
        background-color: rgba(0,0,0,.8);
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        letter-spacing: 3px;
        font-size: 18px;
        color: #fff;
      }

      .recipe-info-container {
          flex: 0 0 40%;
          display: flex;
          flex-flow: column;
      }

      .recipe-name-container {
          width: 100%;
          overflow-wrap: break-word;
          word-wrap: break-word;
          hyphens: auto;
      }

      .recipe-name {
          margin: 0;
          font-size: 15px;
          font-weight: 900;
          color: #06b4fe;
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
          font-size: 12px;
          color: #999;
      }

      @media (min-width: 700px) {
          .user-recipe {
              flex: 0 0 45%;
          }
      }
    `}</style>
    </div>
  </Link>
);
