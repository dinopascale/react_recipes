export default ({ text }) => (
  <div className="comment body-one">
    {text}
    <style jsx>{`
      .comment {
        line-height: 1.6;
        color: #777e8e;
        padding: 4px 0;
        margin-bottom: 9px;
      }
    `}</style>
  </div>
);
