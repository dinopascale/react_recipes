import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default props => {
  let icon = null;

  if (props.icon) {
    icon = (
      <span className="icon">
        <FontAwesomeIcon icon={props.icon} />
        <style jsx>{`
          .icon {
            font-size: 100%;
            pointer-events: none;
          }
        `}</style>
      </span>
    );
  }

  let button = (
    <button
      onClick={props.handleClick}
      style={props.customStyle}
      name={props.name}
      className="action-button"
      type="button"
      disabled={props.disabled}
    >
      {icon}
      {props.children ? (
        <p
          className="button-text text"
          style={{ marginLeft: props.icon ? '10px' : '0' }}
        >
          {props.children}
        </p>
      ) : null}
      <style jsx>{`
        .action-button {
          flex: 0 1 30%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          background: transparent;
          padding: 10px;
          border-radius: 3px;
          outline: none;
          max-height: 36px;
          max-width: 200px;
        }

        .action-button:disabled {
          color: #bbb !important;
        }

        .text {
          margin-top: 0;
          margin-bottom: 0;
          display: inline-block;
          width: 100%;
        }
      `}</style>
    </button>
  );

  if (props.isLink) {
    return (
      <Link href={props.href} as={props.as}>
        {button}
      </Link>
    );
  }

  return button;
};
