import ActionButton from '../../shared/ActionButton';

export default ({ step, steps }) => {
  if (step - 1 === 0) {
    return null;
  }

  return (
    <ActionButton
      isLink
      href={`/new_recipe/step?stepName=${steps[+step - 2]}&step=${+step - 1}`}
      as={`/new_recipe/${steps[+step - 2]}`}
      customStyle={{
        margin: '10px auto',
        flex: '1 0 100%'
      }}
    >
      Back
    </ActionButton>
  );
};
