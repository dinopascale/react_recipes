import CommentElement from './threadList/CommentElement';
import CommentList from './threadList/CommentList';
import ThreadsListApi from '../../hoc/ThreadsListApi';

export default ({
  list,
  sortBy,
  userInfo,
  isAuthor,
  setEditableRef,
  enterEditMode,
  exitEditMode,
  editingThread,
  submitChangeElement,
  deleteElement,
  rateElement
}) => {
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
            isAuthor={isAuthor}
            enterEditMode={enterEditMode}
            exitEditMode={exitEditMode}
            editingThread={editingThread}
            submitChangeElement={submitChangeElement}
            deleteElement={deleteElement}
            rateElement={!!userInfo ? rateElement(index) : null}
            showNewComment={showNewComment}
            listShowed={commentsInfo.showList}
            toggleShowList={toggleShowList}
          />
          <CommentList
            list={commentsInfo.list}
            loadData={loadData}
            isAuth={!!userInfo}
            isAuthor={isAuthor}
            loaded={commentsInfo.listLoaded}
            showed={commentsInfo.showList}
            newCommentShowed={commentsInfo.showNewElement}
            userInfo={userInfo}
            showNewComment={showNewComment}
            hideNewComment={hideNewComment}
            setNewCommentRef={setNewCommentRef}
            submitNewComment={submitNewComment}
            setEditableElement={setEditableElement}
            editingComment={commentsInfo.idElementEditing}
            enterCommentEditMode={enterCommentEditMode}
            exitCommentEditMode={exitCommentEditMode}
            submitChangeComment={submitChangeComment}
            deleteComment={deleteComment}
            rateComment={rateComment}
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
