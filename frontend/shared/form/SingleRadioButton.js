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
            <div className="md-radio" key={opt}>
              <input
                type="radio"
                id={opt}
                value={opt}
                checked={opt === field.value}
                onChange={change}
              />
              <label htmlFor={opt} onClick={change} title="radio-label">
                {opt}
              </label>
            </div>
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
          margin-top: 4px;
          width: 100%;
        }

        .md-radio {
          margin: 16px 0;
        }

        .md-radio input[type='radio'] {
          display: none;
        }
        .md-radio input[type='radio']:checked + label:before {
          border-color: #337ab7;
          animation: ripple 0.2s linear forwards;
        }
        .md-radio input[type='radio']:checked + label:after {
          transform: scale(1);
        }
        .md-radio label {
          display: inline-block;
          height: 20px;
          position: relative;
          padding: 0 30px;
          margin-bottom: 0;
          cursor: pointer;
          vertical-align: bottom;
        }
        .md-radio label:before,
        .md-radio label:after {
          position: absolute;
          content: '';
          border-radius: 50%;
          transition: all 0.3s ease;
          transition-property: transform, border-color;
        }
        .md-radio label:before {
          left: 0;
          top: 0;
          width: 20px;
          height: 20px;
          border: 1px solid #bdbdbd;
        }
        .md-radio label:after {
          top: 5px;
          left: 5px;
          width: 10px;
          height: 10px;
          transform: scale(0);
          background: #337ab7;
        }

        @keyframes ripple {
          0% {
            box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0);
          }
          50% {
            box-shadow: 0px 0px 0px 15px rgba(0, 0, 0, 0.1);
          }
          100% {
            box-shadow: 0px 0px 0px 15px rgba(0, 0, 0, 0);
          }
        }

        // .option {
        //   position: absolute;
        //   visibility: hidden;
        //   display: none;
        // }

        // .option:checked + .option-label {
        //     color: #fff;
        //     background-color:#26335e;
        // }

        // .option-label + .option + .option-label {
        //     border-left: solid 1px #26335e;
        //   }

        // .option-label {
        //     cursor-pointer;
        //     padding: 8px 0px;
        //     color: #26335e;
        //     flex-grow: 1;
        //     text-align: center;
        //     font-size: 12px;
        //     transition: all .15s ease-in;
        // }
      `}</style>
    </div>
  );
};
