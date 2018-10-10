import TextareaAutoresize from './singleTextarea/TextareaAutoresize';

const checkInvalidValue = (val, limit, isMax) => {
  return isMax ? val > limit : val < limit;
};

export default ({ field, change, blur }) => {
  const value = field.value ? field.value : '';

  return (
    <div className="form-group">
      <div className="form-field">
        <label className="form-label" htmlFor={field.name}>
          {field.name}{' '}
          <span className="form-label-req">
            {field.rules.required ? '- Required' : '- Optional'}
          </span>
        </label>
        <TextareaAutoresize
          className={[
            'form-textarea',
            field.isPristine ? null : field.isInvalid ? 'invalid' : 'valid'
          ].join(' ')}
          name={field.name}
          value={value}
          id={field.name}
          onChange={change}
          onBlur={blur}
        />
        <div className="form-suggestion">
          <span>
            You wrote
            <span
              className={
                value
                  ? value &&
                    checkInvalidValue(
                      value.length,
                      field.rules.minlength || field.rules.maxlength,
                      !!field.rules.maxlength
                    )
                    ? 'invalid-text'
                    : 'valid-text'
                  : 'invalid-text'
              }
            >
              {value === null ? ' 0' : ' ' + value.length}
            </span>{' '}
            / {field.rules.minlength || field.rules.maxlength} characters
          </span>
        </div>
        {field.errorMessage === 'Field is required' ? (
          <div className="form-error">{field.errorMessage}</div>
        ) : null}
      </div>
      <style jsx>{`
        .form-group {
          width: 100%;
          display: flex;
          flex-flow: column;
          margin-bottom: 20px;
        }

        .form-field {
          position: relative;
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          justify-content: space-between;
        }

        .form-label {
          text-transform: capitalize;
          color: #666;
          font-weight: bold;
          font-size: 14px;
          flex: 1 0 100%;
          margin-bottom: 4px;
        }

        .form-label-req {
          font-size: 12px;
          color: #888;
          font-weight: normal;
        }

        .form-suggestion {
          font-style: italic;
          font-size: 14px;
          color: #888;
        }

        .form-error {
          padding-top: 4px;
          width: 100%;
          font-style: italic;
          font-size: 14px;
          color: #888;
        }

        .invalid-text {
          color: #b71c1c;
          font-weight: bold;
        }

        .valid-text {
          color: #00e676;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};
