import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => {
  let icon = null;
  if (props.icon) {
    icon = (
      <span className="icon">
        <FontAwesomeIcon icon={props.icon} />
        <style jsx>{`
          .icon {
            font-size: 19px;
            // margin-right: 10px;
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
      {props.children ? (
        <p className="text" style={{ marginLeft: props.icon ? '10px' : '0' }}>
          {props.children}
        </p>
      ) : null}
      <style jsx>{`
        button {
          flex: 0 1 30%;
          display: flex;
          justify-content: center;
          align-items: center;
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
