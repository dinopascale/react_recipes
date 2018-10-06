import CommentElement from './threadList/CommentElement';
import CommentList from './threadList/CommentList';

export default ({
  list,
  sortBy,
  userInfo,
  setEditableRef,
  enterEditMode,
  exitEditMode,
  editingThread,
  submitChangeElement,
  deleteElement,
  rateElement,
  showResponseList,
  conversationShowed
}) => {
  console.log(sortBy);
  return list.sort((a, b) => b[sortBy] - a[sortBy]).map((comment, index) => (
    <div key={comment._id} className="comment-element-container">
      <CommentElement
        comment={comment}
        setEditableRef={setEditableRef}
        editable={userInfo ? comment.user._id === userInfo._id : false}
        enterEditMode={enterEditMode}
        exitEditMode={exitEditMode}
        editingThread={editingThread}
        submitChangeElement={submitChangeElement}
        deleteElement={deleteElement}
        rateElement={!!userInfo ? rateElement(index) : null}
        // showResponses={showResponseList(index)}
      />
      {/* {conversationShowed.includes(index) ? (
        <CommentList
          apiId={comment._id}
          baseURL="/api/comment"
          type="comments"
          auth={isAuth}
        />
      ) : null} */}
      <style jsx>{`
        .comment-element-container {
          padding: 8px 20px 8px 20px;
        }
      `}</style>
    </div>
  ));
};
