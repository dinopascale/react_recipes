import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ action, icon, type, text }) => (
  <button
    onClick={action}
    className={type === 'extended' ? 'floating-extended' : 'floating'}
  >
    {/* <p className="icon">
      <FontAwesomeIcon icon={icon} />
    </p> */}
    <span className="icon">
      <FontAwesomeIcon icon={icon} />
    </span>
    {text ? <span className="text">{text}</span> : null}
    <style jsx>{`
      .floating-extended,
      .floating {
        position: fixed;
        bottom: 16px;
        background-color: #10aeb2;
        color: #fff;
        box-shadow: 0px 2px 5px #666;
        cursor: pointer;
        z-index: 110;
        outline: none;
        font-size: 14px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .floating {
        right: 16px;
        width: 56px;
        height: 56px;
        border: none;
        border-radius: 50%;
      }

      .floating-extended {
        left: 50%;
        transform: translate(-50%, 0);
        min-width: 68px;
        height: 48px;
        border-radius: 28px;
      }

      .icon {
        padding: 0;
        margin: 0 6px 0 12px;
      }

      .text {
        margin: 0 20px 0 6px;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: bold;
      }
    `}</style>
  </button>
);
