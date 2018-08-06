import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => (
  <div className="chips">
    <button onClick={props.handleClick}>
      <FontAwesomeIcon icon={props.icon} />
    </button>
    <style jsx>{`
      .chips {
        display: inline;
        position: absolute;
        top: 0px;
        right: 0px;
      }

      .chips button {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: none;
        background: transparent;
        text-align: center;
        color: #000;
        outline: none;
      }
    `}</style>
  </div>
);
