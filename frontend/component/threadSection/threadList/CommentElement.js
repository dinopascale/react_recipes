import Editable from '../../../shared/Editable';
import dateIntervale from '../../../utils/dateIntervale';
import RateComment from './commentElement/RateComment';

export default ({ comment, rateComment, deleteSelf, showResponses }) => (
  <div className="comment-element">
    <div className="user-row">
      <div
        className="user-avatar"
        style={{ backgroundImage: `url('${comment.user.avatar}')` }}
      />
      <div className="user-name-row">
        <span className="user-name">{comment.user.username}</span>
        <span className="rates">
          {comment.totalRate} votes · {dateIntervale(comment.createdAt)}
        </span>
      </div>
    </div>
    <Editable
      data={comment.text}
      name="text"
      type="textarea"
      auth={comment.editable}
      endpoint={`/api/thread/${comment._id}`}
      deleteSelf={deleteSelf}
    />
    <div className="action-row">
      {showResponses ? (
        <div className="ciao" onClick={showResponses}>
          Respond
        </div>
      ) : null}
      <RateComment
        totalRate={comment.totalRate}
        rateComment={rateComment}
        userRate={comment.userRate}
      />
    </div>
    <style jsx>{`
      .comment-element {
        padding: 20px 0 10px 0;
        margin: 0 20px;
        background: #fff;
        border-radius: 5px;
      }

      .user-row {
        padding: 10px 20px;
        display: flex;
        flex-flow: row nowrap;
      }

      .user-avatar {
        background-position: center center;
        background-size: contain;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .user-name-row {
        font-size: 14px;
        display: flex;
        flex-flow: column;
      }

      .user-name {
        margin-bottom: 5px;
      }

      .action-row {
        display: flex;
        align-items: center;
      }

      .ciao {
        flex: 1 0 50%;
        padding-left: 20px;
        color: #aaa;
        font-size: 13px;
      }

      .rates {
        font-size: 12px;
        color: #aaa;
      }
    `}</style>
  </div>
);