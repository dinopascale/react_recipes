import React, { Component, Fragment } from 'react';
import fetch from 'isomorphic-unfetch';

import IngredientListElement from './ingredientList/IngredientListElement';
import ActionButton from '../shared/ActionButton';

class IngredientList extends Component {
  state = {
    isEditMode: false,
    ingredientsList: JSON.parse(JSON.stringify(this.props.ingredients))
  };

  enterEditMode = () => {
    this.setState({ isEditMode: true });
  };

  exitEditMode = () => {
    this.setState({
      isEditMode: false,
      ingredientsList: this.props.ingredients
    });
  };

  saveAndExitEdit = async () => {
    const rawResponse = await fetch(`/api/recipe/${this.props.recipeId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingredients: this.state.ingredientsList })
    });

    const result = await rawResponse.json();
    this.setState({ isEditMode: false });
  };

  onChangeHandler = i => event => {
    const newIngredientsList = [...this.state.ingredientsList];
    newIngredientsList[i][event.target.name] = event.target.value;
    this.setState({
      ingredientsList: newIngredientsList
    });
  };

  onDeleteIngredient = i => event => {
    const newIngredientsList = this.state.ingredientsList.slice();
    newIngredientsList.splice(i, 1);
    this.setState({ ingredientsList: newIngredientsList });
  };

  onAddIngredient = () => {
    const newIngredientsList = this.state.ingredientsList.slice();
    newIngredientsList.push({
      name: '',
      quantity: ''
    });
    this.setState({ ingredientsList: newIngredientsList });
  };

  render() {
    let editBtn = null;
    if (this.props.isEditable) {
      if (!this.state.isEditMode) {
        editBtn = (
          <ActionButton handleClick={this.enterEditMode}>Edit</ActionButton>
        );
      } else {
        editBtn = (
          <div>
            <ActionButton
              handleClick={this.saveAndExitEdit}
              icon="save"
              bgColor="#118ab2"
            >
              Save
            </ActionButton>
            <ActionButton
              handleClick={this.exitEditMode}
              icon="ban"
              gutter
              bgColor="#ef476f"
            >
              Cancel
            </ActionButton>
          </div>
        );
      }
    }
    return (
      <div className="ingredients-section">
        <h2 className="title">Ingredients</h2>
        <div className="list">
          {editBtn}
          {this.state.ingredientsList.map((ingredient, index) => {
            return (
              <IngredientListElement
                key={index}
                name={ingredient.name}
                quantity={ingredient.quantity}
                changed={this.onChangeHandler(index)}
                isEditMode={this.state.isEditMode}
                delete={this.onDeleteIngredient(index)}
              />
            );
          })}
          {this.state.isEditMode ? (
            <ActionButton handleClick={this.onAddIngredient} icon="plus">
              <span>New Ingrendient</span>
            </ActionButton>
          ) : null}
        </div>
        <style jsx>{`
          .ingredients-section {
            padding: 0 30px;
          }
          .title {
            text-align: center;
            font-size: 24px;
          }
          .list {
            position: relative;
            flex-flow: row wrap;
          }
        `}</style>
      </div>
    );
  }
}

export default IngredientList;
