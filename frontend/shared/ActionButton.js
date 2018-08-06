import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => {
  let icon = null;
  if (props.icon) {
    icon = (
      <span className="icon">
        <FontAwesomeIcon icon={props.icon} />
        <style jsx>{`
          .icon {
            margin-bottom: 10px !important;
          }
        `}</style>
      </span>
    );
  }
  return (
    <button
      onClick={props.handleClick}
      style={{
        color: props.color,
        margin: props.gutter ? '10px' : null
      }}
    >
      {icon}
      <p className="text">{props.children}</p>
      <style jsx>{`
        button {
          flex: 0 1 30%;
          border: none;
          background: #fff;
          padding: 10px;
          border-radius: 3px;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          outline: none;
        }
        .text {
          margin-top: 5px;
          margin-bottom: 0;
        }
      `}</style>
    </button>
  );
};
