export default ({ text, setEditableRef }) => (
  <div>
    <div
      ref={setEditableRef}
      contentEditable
      className="editable body-one"
      dangerouslySetInnerHTML={{ __html: text }}
    />
    <style jsx>{`
      .editable {
        min-height: 100px;
        line-height: 1.6;
        border: 1px solid #000;
        outline: none;
        padding: 3px;
        margin-bottom: 8px;
      }
    `}</style>
  </div>
);
