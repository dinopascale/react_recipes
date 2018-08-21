import ControlRow from './renderEditable/ControlRow';
import InputType from './renderEditable/InputType';

export default props => {
  let controlContainer = null;
  let classes = ['single-field'];

  let content = null;

  if (props.isToDelete) {
    classes.push('to-delete');
  }
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
        {props.withLabel ? (
          <label className="label-editing">{key}</label>
        ) : null}
        <InputType
          type={props.type}
          change={props.onChange}
          name={key}
          value={props.infos[key]}
          options={props.options}
          label={props.withLabel ? null : key}
        />
        <style jsx>{`
          .render-single {
            flex: 1 0 50%;
            line-height: 1.5;
          }
          .render-list {
            display: inline-block;
            flex: 1 0 50%;
            padding: 15px 0;
          }

          .label-editing {
            font-weight: bold;
            font-size: 12px;
            display: block;
            width: 95%;
            margin: 0 auto;
          }
        `}</style>
      </div>
    ));
    controlContainer = (
      <div className="control-container">
        <ControlRow
          save={props.onSave}
          exit={props.onStop}
          deleteSelf={props.deleteSelf}
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
            padding: 15px 0;
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
          transform: translateX(0);
        }

        .single-field.list {
          border-bottom: 1px solid #ccc;
          transition: all 0.2s ease-out;
          position: relative;
        }

        .single-field.list:before {
          content: '';
          position: absolute;
          bottom: 50%;
          left: 0px;
          height: 2px;
          background-color: rgb(239, 71, 111);
          width: 100%;
          transform: translate(-50px, 50%);
          opacity: 0;
          transition: all 0.2s ease-in;
        }

        single-field .single-field.list.editing,
        .single-field.editing {
          display: flex;
          flex-flow: column;
          background: #eee;
          padding: 20px 5px 0 5px;
        }

        .single-field.list.to-delete {
          //   transform: scale(0.8);
        }

        .single-field.list.to-delete:before {
          transform: translate(0px, 50%);
          opacity: 1;
        }
      `}</style>
    </div>
  );
};
