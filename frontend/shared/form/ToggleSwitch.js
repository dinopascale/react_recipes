export default ({ field, change, width }) => (
  <div className="form-group-switch">
    <div className="form-label">
      <input
        type="checkbox"
        id="id-name--1"
        title="switch"
        name="set-name"
        className="switch-input"
        onChange={change}
        checked={field.value}
      />
      <label htmlFor="id-name--1" className="switch-label field-name">
        {field.name}
      </label>
    </div>
    {/* <div className="radio-group">
      <input
        id="truthy"
        className="toggle toggle-left"
        type="radio"
        title="radio-label"
        value="true"
        checked={field.value}
        onChange={change}
      />
      <label htmlFor="truthy" className="btn" onClick={change}>
        Yes
      </label>
      <input
        id="falsy"
        className="toggle toggle-right"
        type="radio"
        value="false"
        title="radio-label"
        checked={!field.value}
        onChange={change}
      />
      <label htmlFor="falsy" className="btn" onClick={change}>
        No
      </label>
    </div> */}
    <style jsx>{`
      .form-group-switch {
        width: ${width || '100%'};
        display: flex;
        flex-flow: row;
        margin-bottom: 20px;
      }

      .field-name {
        text-transform: capitalize;
        color: #666;
        font-weight: bold;
        font-size: 14px;
        flex: 1 0 100%;
        margin-bottom: 4px;
      }

      .form-label {
        text-transform: capitalize;
        color: #666;
        font-weight: bold;
        font-size: 14px;
        flex: 1 0 100%;
        margin-bottom: 4px;
      }

      .label-req {
        font-size: 12px;
        color: #888;
        font-weight: normal;
      }

      .radio-group {
        margin-top: 4px;
      }

      .switch-input {
        display: none;
      }
      .switch-label {
        position: relative;
        display: inline-block;
        min-width: 112px;
        cursor: pointer;
        text-align: left;
      }

      .switch-label:before,
      .switch-label:after {
        content: '';
        position: absolute;
        margin: 0;
        outline: 0;
        top: 50%;
        -ms-transform: translate(0, -50%);
        -webkit-transform: translate(0, -50%);
        transform: translate(0, -50%);
        -webkit-transition: all 0.3s ease;
        transition: all 0.3s ease;
      }
      .switch-label:before {
        right: 1px;
        width: 34px;
        height: 14px;
        background-color: #9e9e9e;
        border-radius: 8px;
      }

      .switch-label:after {
        right: 0;
        width: 20px;
        height: 20px;
        background-color: #fafafa;
        border-radius: 50%;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14),
          0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084);
      }

      .switch-input:checked + .switch-label:before {
        background-color: #06acfe;
      }
      .switch-input:checked + .switch-label:after {
        background-color: #00488e;
        -ms-transform: translate(-80%, -50%);
        -webkit-transform: translate(-80%, -50%);
        transform: translate(-80%, -50%);
      }
    `}</style>
  </div>
);
