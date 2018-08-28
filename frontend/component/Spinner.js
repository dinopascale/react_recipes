import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ isLoading }) => (
  <div className="spinner-container">
    <div className="spinner">
      <span className="spin">
        <FontAwesomeIcon icon="spinner" />
      </span>
    </div>
    <style jsx>{`
      .spinner-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.8);
        z-index: 1001;
      }

      .spinner {
        color: #77b5ff;
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
