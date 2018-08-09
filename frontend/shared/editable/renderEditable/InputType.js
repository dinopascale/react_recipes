export default props => {
  let input = null;
  switch (props.type) {
    case 'textarea':
      input = (
        <textarea
          onChange={props.change}
          value={props.value}
          name={props.name}
          rows="9"
          cols="40"
        />
      );
      break;
    case 'img':
      input = (
        <div>
          <img className="image" src={props.value} />
          <input
            type="text"
            onChange={props.change}
            name={props.name}
            value={props.value}
          />
          <style jsx>{`
            .image {
              width: 100%;
              min-width: 300px;
              max-width: 600px;
            }
          `}</style>
        </div>
      );
      break;
    case 'checkbox':
      input = (
        <div>
          {props.options.map(opt => (
            <div key={opt}>
              <input
                type="radio"
                name={props.name}
                value={opt}
                checked={props.value === opt}
                onChange={props.change}
              />
              <span>{opt}</span>
            </div>
          ))}
        </div>
      );
      break;
    default:
      input = (
        <input
          type="text"
          onChange={props.change}
          value={props.value}
          name={props.name}
        />
      );
  }
  return input;
};
