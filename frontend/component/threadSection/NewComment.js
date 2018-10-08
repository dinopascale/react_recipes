import ActionButton from '../../shared/ActionButton';

export default ({ showed, hideNew, submit, setNewRef, isResponse }) => {
  if (!showed) {
    return null;
  }

  return (
    <div className="new-comment-container">
      <div
        ref={setNewRef}
        className="new-comment"
        contentEditable
        className="new-comment body-one"
      />
      <div className="action-row">
        <ActionButton
          handleClick={hideNew}
          customStyle={{ color: '#777e8e', padding: '0', textAlign: 'right' }}
        >
          Cancel
        </ActionButton>
        <ActionButton
          handleClick={submit}
          customStyle={{ color: '#06b4fe', padding: '0', textAlign: 'right' }}
        >
          Send
        </ActionButton>
      </div>
      <style jsx>{`
        .new-comment-container {
          padding: ${isResponse ? '0px' : '0 20px'};
        }

        .new-comment {
          min-height: 156px;
          border: 1px solid #ccc;
          line-height: 1.6;
        }

        .action-row {
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-end;
          align-items: stretch;
          min-height: 36px;
        }
      `}</style>
    </div>
  );
};
