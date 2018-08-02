import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => {
  let icon = null;
  if (props.icon) {
    icon = (
      <span className="icon">
        <FontAwesomeIcon icon={props.icon} />
        <style jsx>{`
          .icon {
            margin-right: 10px !important;
          }
        `}</style>
      </span>
    );
  }
  return (
    <button
      onClick={props.handleClick}
      style={{
        backgroundColor: props.bgColor,
        margin: props.gutter ? '10px' : null,
        color: props.bgColor ? '#fff' : '#000'
      }}
    >
      {icon}
      {props.children}
      <style jsx>{`
        button {
          background: #ffd166;
          border: none;
          border-radius: 3px;
          padding: 10px 25px;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
        }
      `}</style>
    </button>
  );
};
