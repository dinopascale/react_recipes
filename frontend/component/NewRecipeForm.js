import SingleInput from '../shared/SingleInput';
import SingleTextarea from '../shared/SingleTextarea';
import ArrayOfInputs from '../shared/ArrayOfInputs';
import Step from '../shared/steps/Step';

const dictInstanceToType = {
  String: 'text',
  Number: 'number'
};

export default ({
  form,
  changed,
  blurred,
  submitted,
  validate,
  steps,
  next,
  back,
  addNew,
  deleteField
}) => {
  return (
    <form onSubmit={submitted} className="new-recipe-form">
      <Step
        fields={[form.img]}
        next={next}
        back={back}
        active={steps.activeStep === 0}
        error={steps.errorMessage}
      >
        <SingleInput
          field={form.img}
          change={changed(form.img.name)}
          blur={blurred(form.img.name)}
          type="img"
        />
      </Step>
      <Step
        fields={[form.name, form.preparationTime, form.cookTime, form.serves]}
        next={next}
        back={back}
        active={steps.activeStep === 1}
        error={steps.errorMessage}
      >
        <SingleInput
          field={form.name}
          change={changed(form.name.name)}
          blur={blurred(form.name.name)}
          type="text"
        />
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
      </Step>
      <Step
        fields={[form.directions]}
        next={next}
        back={back}
        active={steps.activeStep === 2}
        error={steps.errorMessage}
      >
        <SingleTextarea
          field={form.directions}
          change={changed(form.directions.name)}
          blur={blurred(form.directions.name)}
        />
      </Step>
      <Step
        fields={form.ingredients.value}
        next={next}
        back={back}
        active={steps.activeStep === 3}
        error={steps.errorMessage}
      >
        <ArrayOfInputs
          fields={form.ingredients}
          change={changed(form.ingredients.name)}
          blur={blurred(form.ingredients.name)}
          validateSingle={validate}
          addNewField={addNew(form.ingredients)}
          deleteField={deleteField(form.ingredients)}
        />
      </Step>
      {/* <button type="submit">Send</button> */}
      <style jsx>{`
        .new-recipe-form {
          padding: 20px;
          position: relative;
          width: 100%;
          min-height: calc(100vh - 70px);
          overflow-x: hidden;
        }
      `}</style>
    </form>
  );
};
