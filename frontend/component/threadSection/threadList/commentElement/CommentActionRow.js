import { Fragment } from 'react';

import RateComment from './commentActionRow/RateComment';
import ActionButton from '../../../../shared/ActionButton';
import ShowResponses from './commentActionRow/ShowResponses';

export default ({
  comment,
  isComment,
  isAuth,
  showResponses,
  showNewComment,
  listShowed,
  toggleShowList,
  rateElement,
  isEditing,
  exitEditMode,
  submitChangeElement
}) => {
  let content = null;

  if (isEditing) {
    content = (
      <Fragment>
        <ActionButton
          customStyle={{
            color: '#777e8e',
            padding: '0',
            height: '36px',
            flex: '0 0 25%',
            marginRight: '8px'
          }}
          handleClick={exitEditMode}
        >
          Cancel
        </ActionButton>
        <ActionButton
          customStyle={{
            color: '#fff',
            backgroundColor: '#06b4fe',
            padding: '0',
            height: '36px',
            flex: '0 0 25%'
          }}
          handleClick={() => submitChangeElement(comment._id)}
        >
          Send
        </ActionButton>
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <RateComment
          totalRate={comment.totalRate}
          rateComment={rateElement}
          userRate={comment.userRate}
          isAuth={isAuth}
          isComment={isComment}
        />
        <ShowResponses
          isAuth={isAuth}
          isComment={isComment}
          showResponses={showResponses}
          showNewComment={showNewComment}
          listShowed={listShowed}
          toggleShowList={toggleShowList}
        />
      </Fragment>
    );
  }

  return (
    <div className="action-row">
      {content}
      <style jsx>{`
        .action-row {
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-end;
          align-items: center;
          min-height: 36px;
        }
      `}</style>
    </div>
  );
};
