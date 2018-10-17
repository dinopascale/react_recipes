export default props => (
  <div className="message-container">
    <p className="message body-one">
      There are no comments for this recipe. Be the first to write one!{' '}
    </p>
    <style jsx>{`
      .message-container {
        padding: 10px 20px;
      }

      .message {
        color: #bbb;
        line-height: 1.6;
        text-align: center;
      }
    `}</style>
  </div>
);
