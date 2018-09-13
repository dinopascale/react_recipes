import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ isLoading, type }) => (
  <div className="spinner-container">
    <div className="spinner">
      <span className="spin">
        <FontAwesomeIcon icon="spinner" />
      </span>
    </div>
    <style jsx>{`
      .spinner-container {
        position: ${type !== 'contain' ? 'fixed' : 'absolute'};
        top: 0;
        left: 0;
        width: ${type !== 'contain' ? '100vw' : '100%'};
        height: ${type !== 'contain' ? '100vh' : '100%'};
        background-color: rgba(255, 255, 255, 0.8);
        z-index: 1001;
      }

      .spinner {
        color: #10aeb2;
        font-size: 90px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .spin {
        animation: spin 2s infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);
