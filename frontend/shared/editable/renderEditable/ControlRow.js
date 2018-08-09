import ActionButton from '../../../shared/ActionButton';

const styleBtn = {
  backgroundColor: '#eee',
  borderRadius: '3px',
  flex: '1 0 30%',
  marginRight: '10px'
};

export default props => (
  <div className="controlRow">
    <ActionButton handleClick={props.save} icon="save" customStyle={styleBtn}>
      <span>Save</span>
    </ActionButton>
    <ActionButton handleClick={props.exit} icon="ban" customStyle={styleBtn}>
      <span>Cancel</span>
    </ActionButton>
    <style jsx>{`
      .controlRow {
        margin-top: 10px;
        display: flex;
        flex-flow: row wrap;
      }
    `}</style>
  </div>
);
