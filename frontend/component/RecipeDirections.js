import React, { Component } from 'react';

class RecipeDirections extends Component {
  state = {
    isEditMode: false,
    recipeDirections: this.props.directions
  };

  onChangeHandler = e => {
    this.setState({
      recipeDirections: e.target.value
    });
  };
  render() {
    let item = (
      <div>
        <p>{this.props.directions}</p>
      </div>
    );
    if (this.state.isEditMode) {
      item = (
        <textarea onChange={this.onChangeHandler}>
          {this.state.recipeDirections}
        </textarea>
      );
    }
    return item;
  }
}

export default RecipeDirections;
