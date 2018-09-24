import Link from 'next/link';
import EditToolbarButton from './editToolbar/EditToolbarButton';

const EditToolbar = ({ itemId, save, isRecipe, exit }) => (
  <div className="edit-toolbar">
    <div className="toolbar-element exit">
      <EditToolbarButton icon="undo" action={exit} />
    </div>
    <div className="toolbar-element">
      <p className="title">Edit</p>
    </div>
    <div className="toolbar-element save">
      <EditToolbarButton icon="save" />
    </div>
    <style jsx>{`
      .edit-toolbar {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0.5em 1em;
        min-height: 60px;
        background-color: #10aeb2;
        color: #fff;
        font-size: 20px;
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
        color: #fff;
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
