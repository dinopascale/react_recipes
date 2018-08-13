export default props => (
  <div className="input-container">
    <label className="label">{props.label}</label>
    <input
      type={props.type ? props.type : 'text'}
      className="input"
      onChange={props.change}
      value={props.value}
      name={props.name}
      placeholder={props.label}
    />
    <style jsx>{`
      .input-container {
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

      .input {
        padding: 16px 8px;
        border-radius: 5px;
        border: 1px solid #fff;
        font-family: 'Open Sans', sans-serif;
        outline: none;
        transition: all 0.2s ease-out;
      }

      .input:focus {
        border: 2px solid #118ab2;
      }
    `}</style>
  </div>
);
