import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => {
  let icon = null;
  if (props.icon) {
    icon = (
      <span className="icon">
        <FontAwesomeIcon icon={props.icon} />
        <style jsx>{`
          .icon {
            // margin-right: 10px;
            flex: 0 1 100%;
            pointer-events: none;
          }
        `}</style>
      </span>
    );
  }
  return (
    <button
      onClick={props.handleClick}
      style={props.customStyle}
      name={props.name}
    >
      {icon}
      <p className="text">{props.children}</p>
      <style jsx>{`
        button {
          flex: 0 1 30%;
          display: flex;
          justify-content: center;
          align-items: baseline;
          border: none;
          background: transparent;
          padding: 10px;
          border-radius: 3px;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          outline: none;
        }

        .text {
          margin-top: 0px;
          margin-bottom: 0;
        }
      `}</style>
    </button>
  );
};
