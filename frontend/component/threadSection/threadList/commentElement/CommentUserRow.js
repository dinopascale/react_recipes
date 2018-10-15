import Link from 'next/link';
import dateIntervale from '../../../../utils/dateIntervale';
import DropdownList from '../../../../hoc/DropdownList';
import DropdownMenu from './commentUserRow/DropdownMenu';

export default ({
  comment,
  editable,
  enterEditMode,
  deleteElement,
  isAuthor
}) => {
  return (
    <div className="user-row">
      <div
        className="user-avatar"
        style={{ backgroundImage: `url('${comment.user.avatar}')` }}
      />
      <div className="user-name-row">
        <Link
          prefetch
          href={
            editable
              ? `/user?userId=${comment.user._id}&isMe=true`
              : `/user?userId=${comment.user._id}`
          }
          as={editable ? '/u/me' : `/u/${comment.user._id}`}
        >
          <span className="user-name body-two">{comment.user.username}</span>
        </Link>
        <span className="rates caption">
          {comment.totalRate} votes · {dateIntervale(comment.createdAt)}
        </span>
      </div>
      <div className="edit-menu">
        {editable ? (
          <DropdownList
            render={(isOpen, toggleShow, close) => (
              <DropdownMenu
                isOpen={isOpen}
                toggle={toggleShow}
                toEdit={() => enterEditMode(comment._id)}
                toDelete={() => deleteElement(comment._id)}
              />
            )}
          />
        ) : null}
      </div>
      <style jsx>{`
        .user-row {
          padding: 10px 0px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
        }

        .user-avatar {
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 10px;
          //   flex: 0 0 10%;
        }

        .user-name-row {
          flex: 1 0 50%;
          font-size: 14px;
          display: flex;
          flex-flow: column;
        }

        .user-name {
          margin-bottom: 5px;
          color: #06b4fe;
          font-weight: ${isAuthor ? '900' : '400'};
        }

        .rates {
          font-size: 12px;
          color: #777e8e;
        }

        .edit-menu {
          flex: 0 0 30%;
          text-align: right;
          color: #777e8e;
        }
      `}</style>
    </div>
  );
};
