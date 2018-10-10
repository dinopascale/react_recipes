import ArrayOfInputs from '../../shared/form/ArrayOfInputs';

export default ({ form, changed, blurred, validate, addNew, deleteField }) => {
  return (
    <div className="form">
      <h5 className="title">Ingredients</h5>
      <p className="subtitle body-one">The list of all single pieces</p>
      {form.ingredients ? (
        <div className="form-group">
          <ArrayOfInputs
            fields={form.ingredients}
            change={changed(form.ingredients.name)}
            blur={blurred(form.ingredients.name)}
            validateSingle={validate}
            addNewField={addNew(form.ingredients)}
            deleteField={deleteField(form.ingredients)}
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
