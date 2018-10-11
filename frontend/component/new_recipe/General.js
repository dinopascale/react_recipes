import SingleInput from '../../shared/form/SingleInput';
import ToggleSwitch from '../../shared/form/ToggleSwitch';
import SingleRadioButton from '../../shared/form/SingleRadioButton';

export default ({ form, changed, blurred }) => {
  console.log(form);
  return (
    <div className="form">
      <h5 className="title">General Info</h5>
      <p className="subtitle body-one">
        Choose recipe's image and name, if you want to share it and who can eat
        it
      </p>
      {form.name ? (
        <div className="form-group">
          <ToggleSwitch
            field={form.sharable}
            change={changed(form.sharable.name)}
          />
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
          <SingleRadioButton field={form.tag} change={changed(form.tag.name)} />
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
