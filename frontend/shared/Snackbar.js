import React from 'react';

class Snackbar extends React.Component {
  constructor(props) {
    super(props);

    this.timer = setInterval(this.props.close, 3500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { message } = this.props;

    return (
      <div className="snackbar">
        <p className="message">
          {message.includes('Validation') ? 'Validation Failed' : message}
        </p>
        <style jsx>{`
          .snackbar {
            position: fixed;
            bottom: 16px;
            left: 0;
            right: 0;
            background: #fff;
            color: #000;
            width: 90%;
            margin: 0 auto;
            max-width: 344px;
            height: 48px;
            border-radius: 4px;
            padding: 6px 6px 6px 16px;
            box-shadow: 0px 2px 5px #666;
            display: flex;
            align-items: center;
            background: #000000dd;
            color: #f1f1f1;
            z-index: 2000;
          }

          .message {
            margin: 0;
            font-size: 13px;
            width: 85%;
          }

          .fade-enter {
            opacity: 0.01;
            transform: translateY(100%);
          }

          .fade-enter.fade-enter-active {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.15s ease-in;
          }

          .fade-leave {
            opacity: 1;
            transform: translateY(0);
          }

          .fade-leave.fade-leave-active {
            opacity: 0.01;
            transform: translateY(100%);
            transition: all 0.15s ease-in;
          }
        `}</style>
      </div>
    );
  }
}

export default Snackbar;
