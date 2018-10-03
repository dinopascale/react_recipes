export default ({ field, change, width }) => (
  <div className="form-group">
    <div className="form-label">
      <span className="field-name">{field.name} </span>
      <span className="label-req">
        {field.rules.required ? '- Required' : '- Optional'}
      </span>
    </div>
    <div className="radio-group">
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
    </div>
    <style jsx>{`
      .form-group {
        width: ${width || '100%'};
        display: flex;
        flex-flow: column;
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

      .toggle {
        display: none;
      }

      .btn {
        cursor: pointer;
        border: 1px solid #26335e;
        display: inline-block;
        padding: 4px 20px;
        font-size: 14px;
        width: 61px;
        color: #26335e;
        position: relative;
        text-align: center;
        transition: background 600ms ease, color 600ms ease;
      }

      .btn:after {
        background: #26335e;
        content: '';
        height: 100%;
        position: absolute;
        top: 0;
        transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
        width: 100%;
        z-index: -1;
      }

      .toggle.toggle-left + label {
        border-right: 0;
        border-radius: 4px 0 0 4px;
      }

      .toggle.toggle-left + label:after {
        left: 100%;
      }

      .toggle.toggle-right + label {
        margin-left: -2px;
        border-radius: 0 4px 4px 0;
      }

      .toggle.toggle-right + label:after {
        left: -100%;
      }

      .toggle:checked + label {
        cursor: default;
        color: #fff;
        transition: color 200ms;
      }

      .toggle:checked + label:after {
        left: 0;
      }
    `}</style>
  </div>
);
