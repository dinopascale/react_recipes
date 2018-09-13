import { Fragment } from 'react';

export default ({ field, change, type }) => {
  return (
    <div className="container">
      <span className="field-name">{field.name} </span>
      <span className="label-req">
        {field.rules.required ? '- Required' : '- Optional'}
      </span>
      <div className="radio-group">
        {field.enum.map(opt => {
          return (
            <Fragment key={opt}>
              <input
                type="radio"
                className="option"
                id={opt}
                value={opt}
                checked={opt === field.value}
                onChange={change}
              />
              <label
                htmlFor={opt}
                className="option-label"
                onClick={change}
                title="radio-label"
              >
                {type === 'bool' ? (opt ? 'Yes' : 'No') : opt}
              </label>
            </Fragment>
          );
        })}
      </div>
      <style jsx>{`
        .container {
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

        .label-req {
          font-size: 12px;
          color: #888;
          font-weight: normal;
        }

        .radio-group {
          display: flex;
          flex-flow: row nowrap;
          border: 2px solid #10aeb2;
          border-radius: 3px;
          margin-top: 4px;
          width: 90%;
        }

        .option {
          position: absolute;
          visibility: hidden;
          display: none;
        }

        .option:checked + .option-label {
            color: #fff;
            background-color:#10aeb2;
        }

        .option-label + .option + .option-label {
            border-left: solid 2px #10aeb2;
          }

        .option-label {
            cursor-pointer;
            padding: 8px 0px;
            color: #10aeb2;
            flex-grow: 1;
            text-align: center;
            font-size: 12px;
            transition: all .15s ease-in;
        }
      `}</style>
    </div>
  );
};
