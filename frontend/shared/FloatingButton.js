import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ action, icon }) => (
  <button onClick={action} className="floating">
    <p className="icon">
      <FontAwesomeIcon icon={icon} />
    </p>
    <style jsx>{`
      .floating {
        position: fixed;
        bottom: 16px;
        right: 16px;
        width: 56px;
        height: 56px;
        border: none;
        border-radius: 50%;
        background-color: #10aeb2;
        color: #fff;
        box-shadow: 0px 2px 5px #666;
        cursor: pointer;
        display: flex;
        justify-content: center;
        aling-items: center;
        z-index: 110;
        outline: none;
      }

      .icon {
        padding: 0;
        margin: 0;
        font-size: 24px;
        line-height: 56px;
      }
    `}</style>
  </button>
);
