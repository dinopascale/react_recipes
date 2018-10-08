import ActionButton from '../../../../../shared/ActionButton';
import Router from 'next/router';

export default ({ isAuth, showNewComment, listShowed }) => {
  const action = () => {
    if (!isAuth) {
      return Router.push('/auth/register');
    }

    if (listShowed) {
      return showNewComment();
    } else {
      showNewComment();
    }
  };

  return (
    <ActionButton
      customStyle={{ color: '#777e8e', flex: '0 0 15%' }}
      icon="reply"
      handleClick={action}
    />
  );
};
