import CommentUserRow from './commentElement/CommentUserRow';
import CommentActionRow from './commentElement/CommentActionRow';
import CommentArea from './commentElement/CommentArea';
import EditableCommentArea from './commentElement/EditableCommentArea';

export default ({
  comment,
  isAuth,
  isAuthor,
  isComment,
  rateComment,
  editable,
  setEditableRef,
  showNewComment,
  listShowed,
  toggleShowList,
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
      isAuthor={isAuthor}
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
    <CommentActionRow
      comment={comment}
      isAuth={isAuth}
      isComment={isComment}
      isEditing={editingThread === comment._id}
      rateComment={rateComment}
      exitEditMode={exitEditMode}
      submitChangeElement={submitChangeElement}
      rateElement={rateElement}
      showNewComment={showNewComment}
      listShowed={listShowed}
      toggleShowList={toggleShowList}
    />
    <style jsx>{`
      .comment-element {
        background: #fff;
        border-radius: 5px;
      }
    `}</style>
  </div>
);
