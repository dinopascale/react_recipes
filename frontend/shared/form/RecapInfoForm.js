import React, { Component, Fragment } from 'react';

class RecapInfoForm extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.actualStep === nextProps.max - 1;
  }

  renderIngredients = list => {
    const ingredients = [...list];
    return (
      <div>
        <span className="label">Ingredients</span>
        <ul className="ingredient-list">
          {ingredients.map(el => {
            return (
              <li key={el.name} className="ingredient">
                {el.name} <span className="quantity">({el.quantity})</span>
              </li>
            );
          })}
        </ul>
        <style jsx>{`
          .label {
            color: #999;
            font-weight: bold;
            font-size: 12px;
            margin-bottom: 3px;
          }

          .ingredient-list {
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .ingredient {
            font-size: 14px;
            color: #555;
            padding: 4px;
          }

          .ingredient:before {
            content: '-';
            padding-right: 8px;
            color: #888;
          }

          .quantity {
            font-style: italic;
          }
        `}</style>
      </div>
    );
  };

  renderSingleField = (label, value) => {
    return (
      <div className="recap-element">
        <span className="label">{label}</span>
        <span className="value">
          {label === 'sharable' ? (value === true ? 'Yes' : 'No') : value}
        </span>
        <style jsx>{`
          .recap-element {
            display: flex;
            flex-flow: column;
          }

          .label {
            color: #999;
            font-weight: bold;
            font-size: 12px;
            margin-bottom: 3px;
          }

          .value {
            color: #555;
            font-size: 14px;
            line-height: 1.5;
          }
        `}</style>
      </div>
    );
  };

  render() {
    const data = this.props.transformData();
    return (
      <div className="recap-form-container">
        <h2>Recap of your Recipe</h2>
        <div className="recap-form">
          {Object.keys(data).map(key => {
            return (
              <div
                key={key}
                className={['recap-element-container', key].join(' ')}
              >
                {key === 'img' ? (
                  <img src={data.img} className="img-recap" />
                ) : key === 'ingredients' ? (
                  this.renderIngredients(data.ingredients)
                ) : (
                  this.renderSingleField(key, data[key])
                )}
              </div>
            );
          })}
        </div>
        <style jsx>{`
          .recap-form-container {
            position: relative;
          }

          .recap-form {
            display: flex;
            flex-flow: row wrap;
          }

          .recap-element-container {
            order: 2;
            flex: 0 0 50%;
            margin: 12px 0;
          }

          .recap-element-container.img,
          .recap-element-container.directions,
          .recap-element-container.ingredients {
            flex: 1 0 100%;
          }

          .recap-element-container.img {
            order: 1;
            text-align: center;
          }

          .recap-element-container.directions {
            order: 3;
            overflow-wrap: break-word;
            word-wrap: break-word;
            hyphens: auto;
            width: 100%;
          }

          .img-recap {
            width: 150px;
            height: 150px;
            border-radius: 4px;
          }
        `}</style>
      </div>
    );
  }
}

export default RecapInfoForm;
