import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ action, icon }) => (
  <button onClick={action} className="toolbar-button">
    <FontAwesomeIcon icon={icon} />
    <style jsx>{`
      .toolbar-button {
        background: none;
        color: #fff;
        border: none;
        font-size: 18px;
        width: 36px;
        height: 36px;
        outline: none;
      }
    `}</style>
  </button>
);
