import SingleInput from '../shared/form/SingleInput';
import SingleTextarea from '../shared/form/SingleTextarea';

export default ({ form, changed, blurred }) => (
  <form className="edit-user-form">
    <div className="avatar-container" />
    <h5 className="title">Edit your account</h5>
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
        max-width: 700px;
        margin: 120px 0 40px 0;
        z-index: 110;
        background: #fff;
        padding: 70px 16px 10px 16px;
        border-radius: 4px;
        position: relative;
      }

      .avatar-container {
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 5px solid #fff;
        top: -50px;
        left: 52%;
        transform: translateX(-52%);
        background: #cad1de url('${
          form.avatar ? form.avatar.value : '/static/chef.png'
        }') no-repeat center center;
        background-size: cover;
      }

      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }

      .title {
        margin: 0 0 24px 0;
        font-weight: 900;
      }
    `}</style>
  </form>
);
