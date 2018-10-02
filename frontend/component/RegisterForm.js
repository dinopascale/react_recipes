import Form from '../shared/Form';
import apiEndpoints from '../utils/apiEndpoints';
import SingleInput from '../shared/form/SingleInput';
import ActionButton from '../shared/ActionButton';

const registerButton = {
  float: 'right',
  padding: '10px 30px',
  marginTop: '30px',
  background: '#06b4fe',
  color: '#fff'
};

const RegisterForm = ({ schema, submitSucceeded, submitFailed }) => {
  return (
    <Form
      endpoint={apiEndpoints.register.endpoint}
      options={apiEndpoints.register.options}
      submitSuccess={submitSucceeded}
      submitFail={submitFailed}
      data={schema}
      render={(state, onChange, onBlur, onSubmit, formToAPI) => (
        <form className="form-login">
          <SingleInput
            field={state.username}
            change={onChange(state.username.name)}
            blur={onBlur(state.username.name)}
            type="text"
          />
          <SingleInput
            field={state.email}
            change={onChange(state.email.name)}
            blur={onBlur(state.email.name)}
            type="text"
          />
          <SingleInput
            field={state.password}
            change={onChange(state.password.name)}
            blur={onBlur(state.password.name)}
            type="password"
          />
          <ActionButton handleClick={onSubmit} customStyle={registerButton}>
            Register
          </ActionButton>
          <style jsx>{`
            .form-login {
              margin-top: 30px;
            }
          `}</style>
        </form>
      )}
    />
  );
};

export default RegisterForm;
