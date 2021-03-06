export default ({ close, title, message, onConfirm, onCancel }) => (
  <div className="confirm-modal-backdrop" onClick={close}>
    <div className="confirm-modal">
      <div className="title-row">
        <h6 className="title">{title}</h6>
      </div>
      <div className="message-row">
        <p className="body-one">{message}</p>
      </div>
      <div className="action-row">
        <button className="action-button button-text" onClick={onCancel}>
          Cancel
        </button>
        <button className="action-button button-text" onClick={onConfirm}>
          Discard
        </button>
      </div>
    </div>
    <style jsx>{`
      .confirm-modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .confirm-modal {
        background: #f1f1f1;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        max-width: 280px;
        min-height: 150px;
        margin: 0 auto;
        border-radius: 16px;
        box-shadow: 0px 2px 5px #666;
      }

      .title-row,
      .message-row {
        padding: 0 24px;
      }

      .title-row {
        font-size: 22px;
      }

      .title {
        margin: 20px 0 10px 0px;
      }

      .message-row {
        font-size: 16px;
        color: #777e8e;
        line-height: 1.4;
      }

      .action-row {
        margin-top: 36px;
        padding: 8px;
        min-height: 52px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
      }

      .action-button {
        border: none;
        background: none;
        text-transform: uppercase;
        color: #06b4fe;
      }

      .action-button:nth-child(1) {
        margin-right: 8px;
      }
    `}</style>
  </div>
);
