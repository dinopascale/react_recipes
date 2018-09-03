import SingleInput from '../shared/SingleInput';
import SingleTextarea from '../shared/SingleTextarea';

export default ({ form, changed, blurred, submitted }) => {
  return (
    <form onSubmit={submitted} className="new-recipe-form">
      <SingleInput
        field={form.name}
        change={changed}
        blur={blurred}
        type="text"
      />
      <SingleInput
        field={form.preparationTime}
        change={changed}
        blur={blurred}
        type="number"
      />
      <SingleInput
        field={form.cookTime}
        change={changed}
        blur={blurred}
        type="number"
      />
      <SingleTextarea field={form.directions} change={changed} blur={blurred} />
      {/* <button type="submit">Send</button> */}
      <style jsx>{`
        .new-recipe-form {
          padding: 20px;
        }
      `}</style>
    </form>
  );
};
