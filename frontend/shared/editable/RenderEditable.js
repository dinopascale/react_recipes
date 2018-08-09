import ControlRow from './renderEditable/ControlRow';
import InputType from './renderEditable/InputType';

export default props => {
  let controlContainer = null;
  let classes = ['single-field'];

  let content = null;

  if (props.isList) {
    classes.push('list');
  }
  if (props.isEditing) {
    classes.push('editing');
    content = Object.keys(props.infos).map(key => (
      <div
        className={props.isList ? 'render-list' : 'render-single'}
        onClick={props.onStart}
        key={key}
        style={{ ...props.style }}
      >
        {props.withLabel ? <span className="label">{key} :</span> : null}
        <InputType
          type={props.type}
          change={props.onChange}
          name={key}
          value={props.infos[key]}
          options={props.options}
        />
        <style jsx>{`
        .render-single {
          flex: 1 0 50%;
          line-height: 1.5;
        }
        .render-list {
          display: inline-block;
          flex: 1 0 50%;
          margin: 10px 0;
        }

        .label {
          margin-right: 10px;
          font-weight: bold;
          font-size: 14px;
      `}</style>
      </div>
    ));
    controlContainer = (
      <div className="control-container">
        <ControlRow
          save={props.onSave}
          exit={props.onStop}
          delete={props.onDelete}
          isList={props.isList && !props.withLabel}
        />
        <style jsx>{`
          .control-container {
            padding: 10px 0;
            flex: 1 0 100%;
            width: 100%;
          }
        `}</style>
      </div>
    );
  } else {
    content = Object.keys(props.infos).map(key => (
      <div
        className={props.isList ? 'render-list' : 'render-single'}
        onClick={props.onStart}
        key={key}
        style={{ ...props.style }}
      >
        {props.withLabel ? <span className="label">{key} :</span> : null}

        {props.bgImage ? (
          <img src={props.infos[key]} className="image" />
        ) : (
          props.infos[key]
        )}
        <style jsx>{`
          .render-single {
            flex: 1 0 50%;
            line-height: 1.5;
          }
          .render-list {
            display: inline-block;
            flex: 1 0 50%;
            margin: 10px 0;
          }

          .label {
            margin-right: 10px;
            font-weight: bold;
            font-size: 14px;
          }

          .image {
            width: 100%;
            max-width: 600px;
          }
        `}</style>
      </div>
    ));
  }
  return (
    <div className={classes.join(' ')}>
      {content}
      {controlContainer}
      <style jsx>{`
        .single-field {
          flex: 1 0 80%;
          display: flex;
          flex-flow: row wrap;
          transition: all 0.2s ease-out;
        }

        .single-field.list {
          border-bottom: 1px solid #ccc;
          transition: all 0.2s ease-out;
        }

        .single-field.list.editing,
        .single-field.editing {
          display: flex;
          flex-flow: column;
          background: #eee;
          padding: 40px 5px 0 5px;
        }
      `}</style>
    </div>
  );
};
