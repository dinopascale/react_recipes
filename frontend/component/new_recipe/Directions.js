import SingleTextarea from '../../shared/form/SingleTextarea';

export default ({ form, changed, blurred }) => {
  return (
    <div className="form">
      <h5 className="title">Directions</h5>
      <p className="subtitle body-one">
        What's the secret of success for this recipe?
      </p>
      {form.directions ? (
        <div className="form-group">
          <SingleTextarea
            field={form.directions}
            change={changed(form.directions.name)}
            blur={blurred(form.directions.name)}
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
          font-weight: 900;
          color: #26335e;
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
