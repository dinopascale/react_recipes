import ActionButton from '../../shared/ActionButton';

export default props => {
  let addEmpty = null;
  if (props.isList) {
    addEmpty = (
      <ActionButton handleClick={props.add} icon="plus">
        <span>New</span>
      </ActionButton>
    );
  }

  return (
    <div className="controlRow">
      {addEmpty}
      <ActionButton handleClick={props.save} icon="save" color="#118ab2">
        <span>Save</span>
      </ActionButton>
      <ActionButton handleClick={props.exit} icon="ban" color="#ef476f">
        <span>Cancel</span>
      </ActionButton>
      <style jsx>{`
        .controlRow {
          margin-top: 10px;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};
