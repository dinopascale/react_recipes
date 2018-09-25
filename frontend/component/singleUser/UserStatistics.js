import Spinner from '../Spinner';

export default ({ rates, comments, recipes, isLoading }) => (
  <div className="statistics-container">
    <div className="statistic recipe">
      <p className="label">Recipes</p>
      <div className="container-spinner">
        {isLoading ? (
          <Spinner type="contain" />
        ) : (
          <p className="number">{recipes}</p>
        )}
      </div>
    </div>
    <div className="statistic recipe">
      <p className="label">Rates</p>
      <div className="container-spinner">
        {isLoading ? (
          <Spinner type="contain" />
        ) : (
          <p className="number">{rates}</p>
        )}
      </div>
    </div>
    <div className="statistic recipe">
      <p className="label">Comments</p>
      <div className="container-spinner">
        {isLoading ? (
          <Spinner type="contain" />
        ) : (
          <p className="number">{comments}</p>
        )}
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
        margin: 2px 0;
        font-size: 14px;
        text-transform: uppercase;
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
        font-weight: bold;
        margin: 5px 0;
      }
    `}</style>
  </div>
);
