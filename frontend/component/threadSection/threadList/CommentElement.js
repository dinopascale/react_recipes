import CommentUserRow from './commentElement/CommentUserRow';
import CommentActionRow from './commentElement/CommentActionRow';
import CommentArea from './commentElement/CommentArea';
import EditableCommentArea from './commentElement/EditableCommentArea';

export default ({
  comment,
  rateComment,
  showResponses,
  editable,
  setEditableRef,
  enterEditMode,
  exitEditMode,
  editingThread,
  submitChangeElement,
  deleteElement,
  rateElement
}) => (
  <div className="comment-element">
    <CommentUserRow
      comment={comment}
      editable={editable}
      enterEditMode={enterEditMode}
      deleteElement={deleteElement}
    />
    {editingThread === comment._id ? (
      <EditableCommentArea
        setEditableRef={setEditableRef(comment._id)}
        text={comment.text}
      />
    ) : (
      <CommentArea
        text={comment.text}
        setEditableRef={editable ? setEditableRef(comment._id) : null}
        isEditing={editingThread === comment._id}
      />
    )}
    {/* <div className="action-row">
      {showResponses ? (
        <div className="show-conv button-text" onClick={showResponses}>
          Respond
        </div>
      ) : null}
      <RateComment
        totalRate={comment.totalRate}
        rateComment={rateComment}
        userRate={comment.userRate}
      />
    </div> */}
    <CommentActionRow
      comment={comment}
      isEditing={editingThread === comment._id}
      showResponses={showResponses}
      rateComment={rateComment}
      exitEditMode={exitEditMode}
      submitChangeElement={submitChangeElement}
      rateElement={rateElement}
    />
    <style jsx>{`
      .comment-element {
        background: #fff;
        border-radius: 5px;
      }
    `}</style>
  </div>
);
