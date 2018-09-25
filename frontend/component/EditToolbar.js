import EditToolbarButton from './editToolbar/EditToolbarButton';

const EditToolbar = ({ save, exit }) => (
  <div className="edit-toolbar">
    <div className="toolbar-element exit">
      <EditToolbarButton icon="undo" action={exit} />
    </div>
    <div className="toolbar-element">
      <p className="title">Edit</p>
    </div>
    <div className="toolbar-element save">
      <EditToolbarButton icon="save" action={save} />
    </div>
    <style jsx>{`
      .edit-toolbar {
        flex: 1 0 100%;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0.5em 1em;
        min-height: 60px;
        background-color: rgb(236, 242, 132);
        color: #000;
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
        text-transform: uppercase;
        letter-spacing: 2px;
      }
    `}</style>
  </div>
);

export default EditToolbar;
