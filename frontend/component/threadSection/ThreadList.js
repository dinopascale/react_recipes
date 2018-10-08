import CommentElement from './threadList/CommentElement';
import CommentList from './threadList/CommentList';
import ThreadsListApi from '../../hoc/ThreadsListApi';

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
    <ThreadsListApi
      type="comments"
      id={comment._id}
      key={comment._id}
      render={(
        commentsInfo,
        loadData,
        showNewComment,
        hideNewComment,
        setNewCommentRef,
        submitNewComment,
        setEditableElement,
        enterCommentEditMode,
        exitCommentEditMode,
        submitChangeComment,
        deleteComment,
        rateComment,
        toggleShowList
      ) => (
        <div className="comment-element-container">
          <CommentElement
            comment={comment}
            setEditableRef={setEditableRef}
            editable={userInfo ? comment.user._id === userInfo._id : false}
            isAuth={!!userInfo}
            enterEditMode={enterEditMode}
            exitEditMode={exitEditMode}
            editingThread={editingThread}
            submitChangeElement={submitChangeElement}
            deleteElement={deleteElement}
            rateElement={!!userInfo ? rateElement(index) : null}
            showResponses={loadData}
            showNewComment={showNewComment}
            listShowed={commentsInfo.showList}
            toggleShowList={toggleShowList}
          />
          <CommentList
            list={commentsInfo.list}
            loaded={commentsInfo.listLoaded}
            showed={commentsInfo.showList}
            newCommentShowed={commentsInfo.showNewElement}
            userInfo={userInfo}
            hideNewComment={hideNewComment}
            setNewCommentRef={setNewCommentRef}
            submitNewComment={submitNewComment}
          />
          <style jsx>{`
            .comment-element-container {
              padding: 8px 20px 32px 20px;
            }
          `}</style>
        </div>
      )}
    />
  ));
};
