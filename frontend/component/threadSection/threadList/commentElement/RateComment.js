import ActionButton from '../../../../shared/ActionButton';

export default props => {
  let classes = ['total'];
  if (props.userRate === 1) {
    classes.push('up');
  } else if (props.userRate === -1) {
    classes.push('down');
  }
  return (
    <div className="rate-comment-row">
      <ActionButton
        name="up"
        handleClick={props.rateComment}
        icon="long-arrow-alt-up"
        customStyle={{
          fontSize: '26px',
          color: props.userRate === 1 ? '#77B5B5' : '#aaa',
          maxWidth: '42px'
        }}
      />
      <span className={classes.join(' ')}>{props.totalRate}</span>
      <ActionButton
        name="down"
        icon="long-arrow-alt-down"
        handleClick={props.rateComment}
        customStyle={{
          fontSize: '26px',
          color: props.userRate === -1 ? '#D19DA0' : '#aaa',
          maxWidth: '42px'
        }}
      />
      <style jsx>{`
        .rate-comment-row {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex: 1 0 50%;
        }

        .total {
          flex: 0 1 5%;
          color: #aaa;
          text-align: center;
          margin: 0 10px;
          font-weight: bold;
          font-size: 16px;
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
