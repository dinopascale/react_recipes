export default props => (
  <div className="textarea-container">
    <label className="label">{props.label}</label>
    <textarea
      className="textarea"
      onChange={props.change}
      value={props.value}
      name={props.name}
      rows="9"
      cols="40"
    />
    <style jsx>{`
      .textarea-container {
        display: flex;
        flex-flow: column;
        width: 95%;
        margin: 5px auto;
      }

      .label {
        font-size: 12px;
        margin-bottom: 8px;
        font-weight: bold;
        color: #000;
        font-family: 'Open Sans', sans-serif;
        text-align: left;
      }

      .textarea {
        width: 100%;
        font-size: 14px;
        line-height: 1.6;
        padding: 10px 8px;
        resize: none;
        border: 1px solid #fff;
        border-radius: 5px;
        outline: none;
        transition: all 0.2s ease-out;
      }

      .textarea:focus {
        border: 2px solid #118ab2;
      }
    `}</style>
  </div>
);
