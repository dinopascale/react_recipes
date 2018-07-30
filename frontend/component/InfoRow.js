export default props => (
  <div className="info-row--container">
    {Object.keys(props.infos).map(info => (
      <div key={info} className="info-row--element">
        <span className="info-row--element-label">{info}:</span>{' '}
        <p className="info-row--element-info">{props.infos[info]}</p>
      </div>
    ))}
    <style jsx>{`
      .info-row--container {
        display: flex;
        flex-flow: row wrap;
        padding: 10px 20px;
        justify-content: center;
      }

      .info-row--element {
        flex: 1 0 40%;
        box-sizing: border-box;
        text-align: center;
      }

      .info-row--element-label {
        font-size: 13px;
        color: rgba(0, 0, 0, 0.7);
        margin: 4px 0;
      }

      .info-row--element-info {
        margin: 5px 0 20px 0;
        font-size: 14px;
        font-weight: bold;
      }
    `}</style>
  </div>
);
