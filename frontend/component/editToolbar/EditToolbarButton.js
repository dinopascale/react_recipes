import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ action, icon, text, align = 'left', color = '#919bb0' }) => (
  <button onClick={action} className="toolbar-button">
    {icon ? <FontAwesomeIcon icon={icon} /> : null}
    {text ? <span className="text button-text">{text}</span> : null}
    <style jsx>{`
      .toolbar-button {
        background: none;
        color: ${color};
        border: none;
        width: 100%;
        height: 36px;
        outline: none;
        text-align: ${align};
      }

      .text {
        margin-left: 10px;
      }
    `}</style>
  </button>
);
