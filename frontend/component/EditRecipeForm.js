import SingleInput from '../shared/form/SingleInput';
import ToggleSwitch from '../shared/form/ToggleSwitch';
import SingleRadioButton from '../shared/form/SingleRadioButton';
import SingleTextarea from '../shared/form/SingleTextarea';
import ArrayOfInputs from '../shared/form/ArrayOfInputs';

export default ({ form, changed, blurred, validate, addNew, deleteField }) => (
  <form className="edit-recipe-form">
    <h4 className="form-title">Edit Recipe</h4>
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

    <ToggleSwitch field={form.sharable} change={changed(form.sharable.name)} />

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

    <SingleTextarea
      field={form.directions}
      change={changed(form.directions.name)}
      blur={blurred(form.directions.name)}
    />

    <ArrayOfInputs
      fields={form.ingredients}
      change={changed(form.ingredients.name)}
      blur={blurred(form.ingredients.name)}
      validateSingle={validate}
      addNewField={addNew(form.ingredients)}
      deleteField={deleteField(form.ingredients)}
    />
    <style jsx>{`
      .edit-recipe-form {
        flex: 0 0 95%;
        margin: 90px 0 40px 0;
        z-index: 110;
        background: #fff;
        padding: 30px 16px 10px 16px;
        border-radius: 4px;
      }

      .form-title {
        margin: 0px 0 20px 0;
        color: #26335e;
        font-weight: 900;
      }
    `}</style>
  </form>
);
