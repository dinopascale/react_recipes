import SingleInput from '../shared/form/SingleInput';
import SingleTextarea from '../shared/form/SingleTextarea';

export default ({ form, changed, blurred }) => (
  <form className="edit-user-form">
    <SingleInput
      field={form.avatar}
      change={changed(form.avatar.name)}
      blur={blurred(form.avatar.name)}
      type="img"
    />

    <SingleInput
      field={form.username}
      change={changed(form.username.name)}
      blur={blurred(form.username.name)}
      type="text"
    />

    <SingleTextarea
      field={form.bio}
      change={changed(form.bio.name)}
      blur={blurred(form.bio.name)}
    />
    <style jsx>{`
      .edit-user-form {
        flex: 0 0 95%;
        margin: 90px 0 40px 0;
        z-index: 110;
        background: #fff;
        padding: 30px 16px 10px 16px;
        border-radius: 4px;
      }
    `}</style>
  </form>
);
