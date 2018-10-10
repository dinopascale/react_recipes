import SingleInput from '../../shared/form/SingleInput';
import SingleRadioButton from '../../shared/form/SingleRadioButton';

export default ({ form, changed, blurred }) => {
  return (
    <div className="form">
      <h5 className="title">Times</h5>
      <p className="subtitle body-one">
        How much time this recipe needs? It's difficult to prepare?
      </p>
      {form.preparationTime ? (
        <div className="form-group">
          <SingleInput
            field={form.preparationTime}
            change={changed(form.preparationTime.name)}
            blur={blurred(form.preparationTime.name)}
            type="number"
          />
          <SingleInput
            field={form.cookTime}
            change={changed(form.cookTime.name)}
            blur={blurred(form.cookTime.name)}
            type="number"
          />
          <SingleInput
            field={form.serves}
            change={changed(form.serves.name)}
            blur={blurred(form.serves.name)}
            type="number"
          />
          <SingleRadioButton
            field={form.difficulty}
            change={changed(form.difficulty.name)}
          />
        </div>
      ) : null}
      <style jsx>{`
        .form {
          padding: 0 16px;
        }

        .title,
        .subtitle {
          text-align: center;
        }

        .title {
          margin: 48px 0 0 0;
        }

        .subtitle {
          margin-top: 6px;
          line-height: 1.6;
          color: #777e8e;
        }

        .form-group {
          margin-top: 32px;
        }
      `}</style>
    </div>
  );
};
