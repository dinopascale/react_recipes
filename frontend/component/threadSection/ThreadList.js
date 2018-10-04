import CommentElement from './threadList/CommentElement';
import CommentList from './threadList/CommentList';

export default ({
  list,
  sortBy,
  isAuth,
  deleteEl,
  rate,
  showResponseList,
  conversationShowed
}) => {
  return list.sort((a, b) => b[sortBy] - a[sortBy]).map((comment, index) => (
    <div key={comment._id} className="comment-list">
      <CommentElement
        comment={comment}
        deleteSelf={comment.editable ? deleteEl(index) : null}
        rateComment={isAuth ? rate(index) : null}
        showResponses={showResponseList(index)}
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
        .comment-list {
          padding: 10px 0;
        }
      `}</style>
    </div>
  ));
};
