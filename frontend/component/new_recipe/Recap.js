const fromBoolToString = bool => {
  return bool === true ? 'Yes' : 'No';
};

export default ({ values }) => {
  return (
    <div className="recap-container">
      <h5 className="title">Recap</h5>
      <p className="subtitle body-one">The last thing before we go!</p>
      {Object.keys(values).map(key => {
        if (Array.isArray(values[key])) {
          return (
            <div key={key} className="info-container">
              <p className="label body-two">Ingredients</p>
              <ul className="list-ingredients">
                {values[key].map(el => {
                  return (
                    <li className="info body-one" key={el.name}>
                      {el.name}: {el.quantity}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }
        return (
          <div className="info-container" key={key}>
            <p className="label body-two">{key}</p>{' '}
            <p className="info body-one">
              {typeof values[key] === 'boolean'
                ? fromBoolToString(values[key])
                : values[key]}
            </p>
          </div>
        );
      })}
      <style jsx>{`
        .recap-container {
          padding: 0 16px;
        }

        .title,
        .subtitle {
          text-align: center;
        }

        .title {
          margin: 48px 0 0 0;
          font-weight: 900;
          color: #26335e;
        }

        .subtitle {
          margin-top: 6px;
          line-height: 1.6;
          color: #777e8e;
        }

        .info-container {
          margin: 24px 0;
          overflow-wrap: break-word;
          word-wrap: break-word;
          hyphens: auto;
          width: 100%;
        }

        .list-ingredients {
          margin: 0;
          padding-left: 24px;
        }

        .label {
          font-weight: 900;
          margin: 0px;
        }

        .info {
          margin: 0;
          color: #777e8e;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};
