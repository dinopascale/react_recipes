import ActionButton from '../../shared/ActionButton';

export default props => (
  <div className="container">
    <textarea
      value={props.value}
      onChange={props.changed}
      className="new-comment"
      placeholder="Insert your comment"
      rows="7"
    />
    <div className="action-row">
      <ActionButton
        customStyle={{
          backgroundColor: '#ffd166',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: '12px'
        }}
        handleClick={props.comment}
      >
        Comment
      </ActionButton>
    </div>
    <style jsx>{`
      .container {
        padding: 10px 20px;
      }

      .new-comment {
        width: 100%;
        resize: none;
        font-size: 14px;
        line-height: 1.6;
        padding: 10px 8px;
        border-radius: 5px 5px 0 0;
        outline: none;
      }

      .action-row {
        display: flex;
        justify-content: flex-end;
      }
    `}</style>
  </div>
);
