import Input from './Input';

export default props => (
  <div>
    <img className="image" src={props.value} />
    <Input
      type="url"
      change={props.change}
      name={props.name}
      value={props.value}
      label="Image URL"
    />
    <style jsx>{`
      .image {
        width: 95%;
        min-width: 300px;
        max-width: 600px;
        margin-bottom: 30px;
        margin-left: auto;
        margin-right: auto;
        display: block;
      }
    `}</style>
  </div>
);
