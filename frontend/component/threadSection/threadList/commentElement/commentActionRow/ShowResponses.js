import ActionButton from '../../../../../shared/ActionButton';

export default ({
  isAuth,
  isComment,
  showResponses,
  showNewComment,
  listShowed,
  toggleShowList
}) => {
  let content = null;

  console.log(showResponses);

  if (isComment) {
    return null;
  }

  if (isAuth) {
    content = (
      <ActionButton
        customStyle={{ color: '#777e8e', flex: '0 0 15%' }}
        icon="reply"
        handleClick={() => {
          showResponses();
          showNewComment();
        }}
      />
    );
  } else if (!listShowed) {
    content = (
      <ActionButton
        customStyle={{ color: '#777e8e', flex: '0 0 15%' }}
        handleClick={showResponses}
        icon="caret-down"
      />
    );
  } else {
    content = (
      <ActionButton
        customStyle={{ color: '#777e8e', flex: '0 0 15%' }}
        handleClick={toggleShowList}
        icon="caret-up"
      />
    );
  }

  return content;
};
