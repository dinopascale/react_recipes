import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => {
  let ctn;
  if (props.isEditMode) {
    ctn = (
      <div className="input-field">
        {Object.keys(props.field).map((key, index) => {
          return (
            <input
              type="text"
              value={props.field[key]}
              name={key}
              className={
                index === 0 ? 'input-el input-first' : 'input-el input-second'
              }
              key={key}
              onChange={props.changed}
            />
          );
        })}
        <button className="deleteBtn" onClick={props.delete}>
          <FontAwesomeIcon icon="trash" />
        </button>
        <style jsx>{`
          .input-field {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            margin: 15px 0;
          }

          .input-el {
            border: 1px solid #ccc;
            padding: 8px 5px;
            font-family: 'Open Sans', sans-serif;
            border-radius: 3px;
            outline: none;
            transition: all 0.2s ease-out;
          }

          .input-el:focus {
            border: 2px solid #118ab2;
          }

          .input-el.input-first {
            width: 50%;
            margin-right: 10px;
          }

          .input-el.input-second {
            width: 30%;
            margin-right: 10px;
          }

          .deleteBtn {
            width: 10%;
            border: none;
            background-color: #ffd166;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  } else {
    ctn = (
      <div className="field-container">
        {Object.keys(props.field).map((key, index) => {
          return (
            <p className={index === 0 ? 'label' : 'field'} key={key}>
              {props.field[key]}
            </p>
          );
        })}
        <style jsx>{`
          .field-container {
            margin: 20px 0;
            flex: 0 0 40%;
            text-align: center;
          }

          .label {
            margin: 0;
          }

          .field {
            margin: 0;
            padding: 12px 0;
            color: #777;
            font-size: 14px;
          }
        `}</style>
      </div>
    );
  }

  return ctn;
};
