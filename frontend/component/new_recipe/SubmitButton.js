import ActionButton from '../../shared/ActionButton';

const SubmitButton = ({ submit }) => {
  const styles = {
    margin: '10px auto',
    flex: '1 0 100%',
    backgroundColor: 'rgb(6, 180, 254)',
    color: '#fff',
    width: '150px'
  };
  return (
    <ActionButton handleClick={submit} customStyle={styles}>
      Submit
    </ActionButton>
  );
};

export default SubmitButton;
