import ActionButton from '../../../../../shared/ActionButton';

export default props => {
  let classes = ['total body-two'];
  if (props.userRate === 1) {
    classes.push('up');
  } else if (props.userRate === -1) {
    classes.push('down');
  }
  return (
    <div className="rate-comment">
      <ActionButton
        name="up"
        handleClick={props.rateComment}
        icon="long-arrow-alt-up"
        customStyle={{
          color: props.userRate === 1 ? '#77B5B5' : '#777e8e',
          maxWidth: '42px',
          padding: '0'
        }}
      />
      <span className={classes.join(' ')}>{props.totalRate}</span>
      <ActionButton
        name="down"
        icon="long-arrow-alt-down"
        handleClick={props.rateComment}
        customStyle={{
          color: props.userRate === -1 ? '#D19DA0' : '#777e8e',
          maxWidth: '42px',
          padding: '0'
        }}
      />
      <style jsx>{`
        .rate-comment {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex: 0 0 50%;
          margin-right: 10px;
          border-right: 1px solid #ccc;
        }

        .total {
          flex: 0 1 5%;
          color: #777e8e;
          text-align: center;
        }

        .up {
          color: #77b5b5;
        }

        .down {
          color: #d19da0;
        }
      `}</style>
    </div>
  );
};
