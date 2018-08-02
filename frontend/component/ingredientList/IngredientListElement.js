import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => {
  let azz;
  if (props.isEditMode) {
    azz = (
      <div className="input-field">
        <input
          type="text"
          name="name"
          className="input-el input-name"
          value={props.name}
          onChange={props.changed}
          placeholder="Ingredient Name"
        />
        <input
          type="text"
          name="quantity"
          className="input-el input-qnt"
          value={props.quantity}
          onChange={props.changed}
          placeholder="Quantity"
        />
        <button className="deleteBtn" onClick={props.delete}>
          <FontAwesomeIcon icon="trash" />
        </button>
        <style jsx>{`
          .input-field {
            display: flex;
            flex-flow: row nowrap;
            margin: 25px 0;
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

          .input-el.input-name {
            width: 50%;
            margin-right: 10px;
          }

          .input-el.input-qnt {
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
    azz = (
      <div>
        <p>{props.name}</p>
        <p>{props.quantity}</p>
      </div>
    );
  }

  return azz;
};
