import ActionButton from '../../shared/ActionButton';

export default ({ next, fields, error }) => {
  let text = 'Continue';
  let styles = {
    margin: '10px auto',
    flex: '1 0 100%',
    backgroundColor: 'rgb(6, 180, 254)',
    color: '#fff',
    width: '150px'
  };

  if (error) {
    styles = {
      margin: '10px auto',
      flex: '1 0 100%',
      backgroundColor: '#cc0000',
      color: '#fff',
      width: '150px'
    };
  }

  return (
    <ActionButton handleClick={next(fields)} customStyle={styles}>
      {text}
    </ActionButton>
  );
};
