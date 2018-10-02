import Spinner from '../Spinner';

export default ({ rates, comments, recipes, isLoading }) => (
  <div className="statistics-container">
    <div className="statistic recipe">
      <div className="container-spinner">
        {isLoading ? (
          <Spinner type="contain" />
        ) : (
          <p className="number">{recipes}</p>
        )}
        <p className="label overline">Recipes</p>
      </div>
    </div>
    <div className="statistic recipe">
      <div className="container-spinner">
        {isLoading ? (
          <Spinner type="contain" />
        ) : (
          <p className="number">{rates}</p>
        )}
        <p className="label caption">Rates</p>
      </div>
    </div>
    <div className="statistic recipe">
      <div className="container-spinner">
        {isLoading ? (
          <Spinner type="contain" />
        ) : (
          <p className="number">{comments}</p>
        )}
        <p className="label caption">Comments</p>
      </div>
    </div>
    <style jsx>{`
      .statistics-container {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        margin: 30px 0;
      }

      .statistic {
        flex: 0 0 30%;
        text-align: center;
      }

      .label {
        margin: 0 0 10px 0;
        font-size: 12px;
        text-transform: uppercase;
        color: #777e8e;
      }

      .container-spinner {
        position: relative;
        width: 80%;
        margin-right: auto;
        margin-left: auto;
        margin-top: ${isLoading ? '15px' : '5px'};
        min-height: 50px;
      }

      .number {
        font-size: 32px;
        margin: 5px 0;
        color: #777e8e;
        font-weight: 900;
      }
    `}</style>
  </div>
);
