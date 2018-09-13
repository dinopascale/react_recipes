export default props => (
  <div className="input-container">
    {props.options.map(opt => (
      <div key={opt} className="radiobutton-container">
        <input
          type="radio"
          name={props.name}
          id={opt}
          value={opt}
          checked={props.value === opt}
          onChange={props.change}
          className="radiobutton"
        />
        <label htmlFor={opt} className="option">
          {opt}
        </label>
      </div>
    ))}
    <style jsx>{`
      .input-container {
        display: flex;
        flex-flow: column;
        width: 95%;
        margin-top: 10px;
        font-size: 14px;
        margin-top: 15px;
        margin-left: auto;
        margin-right: auto;
      }

      .radiobutton-container {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
      }

      input[type='radio']:checked,
      input[type='radio']:not(:checked) {
        position: absolute;
        left: -9999px;
      }

      [type='radio']:checked + .option,
      [type='radio']:not(:checked) + .option {
        position: relative;
        padding-left: 28px;
        cursor: pointer;
        line-height: 20px;
        display: inline-block;
        color: #666;
      }

      [type='radio']:checked + .option:before,
      [type='radio']:not(:checked) + .option:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 18px;
        height: 18px;
        border: 1px solid #fff;
        border-radius: 100%;
        background: ${props.checkBg ? props.checkBg : '#fff'};
      }

      [type='radio']:checked + .option:after,
      [type='radio']:not(:checked) + .option:after {
        content: '';
        width: 12px;
        height: 12px;
        background: ${props.checkedColor ? props.checkedColor : '#10aeb2'};
        position: absolute;
        top: 4px;
        left: 4px;
        border-radius: 100%;
        -webkit-transition: all 0.2s ease;
        transition: all 0.2s ease;
      }

      [type='radio']:not(:checked) + .option:after {
        opacity: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      [type='radio']:checked + .option:after {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
      }

      .option {
        font-family: 'Open Sans', sans-serif;
      }
    `}</style>
  </div>
);
