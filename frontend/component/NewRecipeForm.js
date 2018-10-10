import SingleInput from '../shared/form/SingleInput';
import SingleTextarea from '../shared/form/SingleTextarea';
import ArrayOfInputs from '../shared/form/ArrayOfInputs';
import Step from '../shared/form/steps/Step';
import ProgressRow from '../shared/form/steps/ProgressRow';
import RecapInfoForm from './newRecipeForm/RecapInfoForm';
import SingleRadioButton from '../shared/form/SingleRadioButton';
import ToggleSwitch from '../shared/form/ToggleSwitch';
import FloatingButton from '../shared/FloatingButton';

export default ({
  form,
  changed,
  blurred,
  submitted,
  validate,
  steps,
  next,
  back,
  jump,
  addNew,
  max,
  deleteField,
  dataToApi
}) => {
  return (
    <form className="new-recipe-form">
      <ProgressRow steps={max} actual={steps.activeStep} jumpBack={jump} />
      {steps.activeStep === 4 ? (
        <FloatingButton icon="paper-plane" action={submitted} />
      ) : null}
      <Step
        fields={[form.img, form.name]}
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
        <SingleInput
          field={form.name}
          change={changed(form.name.name)}
          blur={blurred(form.name.name)}
          type="text"
        />
        <ToggleSwitch
          field={form.sharable}
          change={changed(form.sharable.name)}
        />
      </Step>
      <Step
        fields={[form.preparationTime, form.cookTime, form.serves]}
        next={next}
        back={back}
        active={steps.activeStep === 1}
        error={steps.errorMessage}
      >
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
        <SingleRadioButton
          field={form.difficulty}
          change={changed(form.difficulty.name)}
        />
        <SingleRadioButton field={form.tag} change={changed(form.tag.name)} />
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
        fields={[form.ingredients]}
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
      <Step active={steps.activeStep === 4}>
        <RecapInfoForm
          formData={form}
          actualStep={steps.activeStep}
          max={max}
          transformData={dataToApi}
        />
      </Step>
      <style jsx>{`
        .new-recipe-form {
          position: relative;
          display: flex;
          align-items: center;
          width: 95%;
          border-radius: 8px;
          margin: 90px auto 30px auto;
          padding: 30px 16px 30px 16px;
          height: 100%;
          background-color: #fff;
        }
      `}</style>
    </form>
  );
};
