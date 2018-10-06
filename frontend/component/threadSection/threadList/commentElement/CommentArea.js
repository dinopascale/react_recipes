export default ({ text }) => (
  <div className="comment body-one">
    {text}
    <style jsx>{`
      .comment {
        line-height: 1.6;
        color: #777e8e;
        margin-bottom: 9px;
      }
    `}</style>
  </div>
);
