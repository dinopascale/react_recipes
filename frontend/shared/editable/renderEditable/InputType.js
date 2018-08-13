import Textarea from './inputType/Textarea';
import Image from './inputType/Image';
import RadioButton from './inputType/RadioButton';
import Input from './inputType/Input';

export default props => {
  let input = null;
  switch (props.type) {
    case 'textarea':
      input = (
        <Textarea
          change={props.change}
          value={props.value}
          name={props.name}
          label={props.label}
        />
      );
      break;
    case 'img':
      input = (
        <Image change={props.change} value={props.value} name={props.name} />
      );
      break;
    case 'checkbox':
      input = (
        <RadioButton
          change={props.change}
          options={props.options}
          name={props.name}
          value={props.value}
        />
      );
      break;
    default:
      input = (
        <Input
          change={props.change}
          value={props.value}
          name={props.name}
          label={props.label}
        />
      );
  }
  return input;
};
