import SingleInput from '../../shared/form/SingleInput';

export default ({ form, changed, blurred }) => {
  return (
    <div className="form">
      <h5 className="title">General Info</h5>
      <p className="subtitle body-one">Choose recipe's image and name</p>
      {form.name ? (
        <div className="form-group">
          <SingleInput
            field={form.name}
            change={changed(form.name.name)}
            blur={blurred(form.name.name)}
            type="text"
          />
          <SingleInput
            field={form.img}
            change={changed(form.img.name)}
            blur={blurred(form.img.name)}
            type="img"
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
