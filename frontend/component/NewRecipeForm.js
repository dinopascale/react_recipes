import SingleInput from '../shared/form/SingleInput';
import SingleTextarea from '../shared/form/SingleTextarea';
import ArrayOfInputs from '../shared/form/ArrayOfInputs';
import Step from '../shared/form/steps/Step';
import ProgressRow from '../shared/form/steps/ProgressRow';
import RecapInfoForm from '../shared/form/RecapInfoForm';
import SingleRadioButton from '../shared/form/SingleRadioButton';
import ToggleSwitch from '../shared/form/ToggleSwitch';
import ActionButton from '../shared/ActionButton';

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
        <ActionButton
          customStyle={{
            position: 'fixed',
            width: '56px',
            height: '56px',
            border: 'none',
            bottom: '16px',
            right: '16px',
            zIndex: '200',
            borderRadius: '50%',
            backgroundColor: '#10aeb2',
            color: '#fff'
          }}
          handleClick={submitted}
          icon="paper-plane"
        />
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
          padding: 0 20px;
          position: relative;
          top: 74px;
          display: flex;
          align-items: center;
          width: 100%;
          min-height: calc(100vh - 74px);
          background-color: #ff7f50;
          overflow-x: hidden;
        }
      `}</style>
    </form>
  );
};
