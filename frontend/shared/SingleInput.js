import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ImgDynamicSrc from './singleInput/ImgDinamycSrc';

export default ({ field, change, blur, type, width }) => (
  <div className="form-group">
    <div className="form-field">
      <label className="form-label" htmlFor={field.name}>
        {field.name}{' '}
        <span className="form-label-req">
          {field.rules.required ? '- Required' : '- Optional'}
        </span>
      </label>
      {type !== 'img' ? null : (
        <ImgDynamicSrc imgURL={field.value} key={field.value} />
      )}
      <input
        className={[
          'form-input',
          field.isPristine
            ? 'form-input'
            : field.isInvalid
              ? 'dirty invalid'
              : 'dirty valid'
        ].join(' ')}
        type={type === 'img' ? 'text' : type}
        name={field.name}
        value={field.value || ''}
        id={field.name}
        onChange={change}
        onBlur={blur}
        spellCheck="false"
      />
      {field.isPristine ? null : (
        <span
          className={field.isInvalid ? 'form-icon invalid' : 'form-icon valid'}
        >
          <FontAwesomeIcon
            icon={field.isInvalid ? 'exclamation' : 'check-circle'}
          />
        </span>
      )}
    </div>
    {field.errorMessage ? (
      <div className="form-error">{field.errorMessage}</div>
    ) : null}
    <style jsx>{`
      .form-group {
        width: ${width || '100%'};
        display: flex;
        flex-flow: column;
        margin-bottom: 20px;
      }

      .form-img-preview {
        width:100%;
        min-height: 250px;  
        max-height: 300px;
        background-image: url('${field.value}'), url('/static/no-img.png');
        background-color: #ffe4c4;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        margin: 6px 0 10px 0;
        border-radius: 8px;
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

      .form-input {
        width: 100%;
        flex: 0 0 75%;
        padding: 5px 8px;
        font-family: 'Open Sans', sans-serif;
        font-size: 15px;
        color: #fff;
        border: none;
        border-radius: 3px;
        background: #77b5ff;
        outline: none;
        transition: all 0.1s linear;
      }

      .form-input::selection {
        color: transparent;
      }

      .form-input:focus,
      .form-input.dirty {
        background: #77b5ff;
        flex: 0 0 90%;
      }

      .form-input.valid {
        background: #00e676;
      }

      .form-input.invalid {
        background: #b71c1c;
      }

      .form-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        padding: 0px;
        border-radius: 50%;
      }

      .form-icon.invalid {
        background: #b71c1c;
        color: #fff;
      }

      .form-icon.valid {
        background: #00e676;
        color: #fff;
      }

      .form-error {
        padding-top: 4px;
        width: 100%;
        font-style: italic;
        font-size: 14px;
        color: #888;
      }
    `}</style>
  </div>
);
