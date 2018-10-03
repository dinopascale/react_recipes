import EditToolbarButton from './editToolbar/EditToolbarButton';

const EditToolbar = ({ save, exit }) => (
  <div className="edit-toolbar">
    <div className="toolbar-element exit">
      <EditToolbarButton icon="times" action={exit} />
    </div>
    <div className="toolbar-element" />
    <div className="toolbar-element save">
      <EditToolbarButton
        action={save}
        text="Save"
        align="right"
        color="#06b4fe"
      />
    </div>
    <style jsx>{`
      .edit-toolbar {
        flex: 1 0 100%;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        height: 56px;
        background-color: #fff;
        color: #919bb0;
        font-size: 20px;
        position: fixed;
        top: 0;
        z-index: 120;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
      }

      .toolbar-element {
        flex: 0 0 33%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .toolbar-element.exit {
        justify-content: flex-start;
      }

      .toolbar-element.save {
        justify-content: flex-end;
      }

      .toolbar-button {
        background: none;
        border: none;
        font-size: 18px;
        width: 36px;
        height: 36px;
      }

      .title {
        margin: 0;
        letter-spacing: 2px;
      }
    `}</style>
  </div>
);

export default EditToolbar;
