import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';

import Chips from '../shared/Chips';
import RecipeFieldListElement from './recipeFielList/RecipeFieldListElement';
import ControlRow from './recipeFielList/ControlRow';

class RecipeFieldList extends Component {
  state = {
    isEditMode: false,
    dataList: JSON.parse(JSON.stringify(this.props.data))
  };

  enterEditMode = () => {
    this.setState({ isEditMode: true });
  };

  exitEditMode = () => {
    this.setState({
      isEditMode: false,
      dataList: this.props.data
    });
  };

  saveAndExitEdit = async () => {
    try {
      const rawResponse = await fetch(`/api/recipe/${this.props.recipeId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [this.props.name]: this.state.dataList })
      });

      const result = await rawResponse.json();
      if (result.error) {
        this.setState({
          isEditMode: false,
          dataList: JSON.parse(JSON.stringify(this.props.data))
        });
      } else {
        this.setState({ isEditMode: false });
      }
    } catch (e) {
      this.setState({ isEditMode: true });
    }
  };

  onChangeHandler = i => event => {
    const newDataList = [...this.state.dataList];
    newDataList[i][event.target.name] = event.target.value;
    this.setState({
      dataList: newDataList
    });
  };

  onDeleteIngredient = i => event => {
    const newDataList = this.state.dataList.slice();
    newDataList.splice(i, 1);
    this.setState({ dataList: newDataList });
  };

  onAddEmptyElement = () => {
    const newDataList = this.state.dataList.slice();
    let empty = {};
    for (let key of Object.keys(newDataList[0])) {
      empty[key] = '';
    }
    newDataList.push(empty);
    this.setState({
      dataList: newDataList
    });
  };

  render() {
    let editButton = null;
    let controlRow = null;

    if (this.props.isEditable && this.props.authInfo.user) {
      editButton = <Chips icon="edit" handleClick={this.enterEditMode} />;
    }

    if (this.state.isEditMode) {
      editButton = null;
      controlRow = (
        <ControlRow
          save={this.saveAndExitEdit}
          exit={this.exitEditMode}
          add={this.onAddEmptyElement}
          isList={typeof this.state.dataList === 'object'}
        />
      );
    }
    return (
      <div className="list-section">
        <div className="title">
          <h2>Ingredients</h2>
          {editButton}
        </div>
        <div className="list">
          {this.state.dataList.map((el, index) => {
            return (
              <RecipeFieldListElement
                key={index}
                field={el}
                changed={this.onChangeHandler(index)}
                isEditMode={this.state.isEditMode}
                delete={this.onDeleteIngredient(index)}
              />
            );
          })}
        </div>
        {controlRow}
        <style jsx>{`
          .list-section {
            padding: 0 30px;
            position: relative;
          }
          .title {
            text-align: center;
            position: relative;
          }

          .title h2 {
            display: inline-block;
            font-size: 24px;
          }

          .list {
            position: relative;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
          }
        `}</style>
      </div>
    );
  }
}

export default RecipeFieldList;
