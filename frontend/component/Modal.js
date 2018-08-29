import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ isOpen, error, close, isSuccess }) => (
  <div
    className="backdrop-modal"
    onClick={close}
    style={{ display: isOpen ? 'block' : 'none' }}
  >
    <div className="modal-container">
      <div className="modal-layout">
        <div className={isSuccess ? 'modal-icon success' : 'modal-icon danger'}>
          <FontAwesomeIcon icon={isSuccess ? 'check-circle' : 'exclamation'} />
        </div>
        <h2
          className={isSuccess ? 'modal-title success' : 'modal-title danger'}
        >
          {isSuccess ? 'Great!' : 'Oh snap!'}
        </h2>
        {error ? (
          <p className="modal-info">
            An error {error ? error.status : null} has occured while processing
            your request. Our servers says:{' '}
            <span className="error-mex">{error ? error.message : null}</span>
          </p>
        ) : (
          <p className="modal-info">
            Your operation has been successfully elaborated
          </p>
        )}
        {error ? (
          <div className="dismiss-row" onClick={close}>
            Dismiss
          </div>
        ) : null}
      </div>
    </div>
    <style jsx>{`
      .backdrop-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 99;
      }

      .modal-container {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 100;
        width: 88%;
        max-width: 400px;
        transform: translate(-50%, -50%);
        background: #fff;
        opacity: 1;
        border-radius: 5px;
      }

      .modal-layout {
        position: relative;
        height: 100%;
        width: 100%;
        padding: 20px;
      }

      .modal-icon {
        color: #fff;
        font-size: 60px;
        position: absolute;
        width: 90px;
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 50%;
        border-radius: 50%;
        padding: 25px;
        top: 0;
        transform: translate(-50%, -50%);
        border: 5px solid #fff;
      }

      .modal-icon.success {
        background: #00e676;
      }

      .modal-icon.danger {
        background: #b71c1c;
      }

      .modal-title {
        margin-top: 50px;
        margin-bottom: 10px;
        font-size: 33px;
        text-align: center;
        color: #b71c1c;
      }

      .modal-title.success {
        color: #00e676;
      }

      .modal-title.danger {
        color: #b71c1c;
      }

      .modal-info {
        font-family: 'Open Sans', sans-serif;
        margin-bottom: 40px;
        font-size: 16px;
        text-align: center;
        line-height: 1.6;
        color: #777;
      }

      .error-mex {
        margin: 20px 0 40px 0;
        display: block;
        color: #555;
        font-weight: bold;
        font-size: 18px;
      }

      .dismiss-row {
        width: 80%;
        max-width: 200px;
        margin: 0px auto;
        text-align: center;
        border-radius: 5px;
        font-family: 'Open Sans', sans-serif;
        background-color: #b71c1c;
        color: #fff;
        padding: 10px 25px;
        cursor: pointer;
      }
    `}</style>
  </div>
);
