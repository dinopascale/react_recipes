import Form from '../shared/Form';
import apiEndpoints from '../utils/apiEndpoints';
import SingleInput from '../shared/form/SingleInput';
import ActionButton from '../shared/ActionButton';

const loginButton = {
  float: 'right',
  padding: '10px 30px',
  marginTop: '30px',
  background: '#06b4fe',
  color: '#fff'
};

const LoginForm = ({ schema, submitSucceeded, submitFailed }) => {
  return (
    <Form
      endpoint={apiEndpoints.login.endpoint}
      options={apiEndpoints.login.options}
      submitSuccess={submitSucceeded}
      submitFail={submitFailed}
      data={schema}
      render={(state, onChange, onBlur, onSubmit, formToAPI) => (
        <form className="form-login">
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
          <ActionButton handleClick={onSubmit} customStyle={loginButton}>
            Login
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

export default LoginForm;
