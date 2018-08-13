import React, { Component } from 'react';

import RenderEditable from './editable/RenderEditable';
import ManageList from './editable/renderEditable/ManageList';

class Editable extends Component {
  state = {
    field: [],
    isEditing: false,
    itemOnEdit: null,
    isDeleteMode: false,
    itemsToDelete: []
  };

  componentDidMount() {
    this.setState({
      field: this.transformData(this.props.data, this.props.name)
    });
  }

  transformData = (data, name) => {
    let transformedData = [];
    if (Array.isArray(data) && typeof data === 'object') {
      transformedData = JSON.parse(JSON.stringify(data));
    } else {
      const obj = {
        [name]: data
      };
      transformedData.push(obj);
    }
    return transformedData;
  };

  startEditing = i => event => {
    event.target.scrollIntoView({
      behavior: 'smooth'
    });
    this.setState({
      isEditing: true,
      itemOnEdit: i,
      isDeleteMode: false
    });
  };

  stopEditing = () => {
    this.setState({
      isEditing: false,
      field: this.transformData(this.props.data, this.props.name),
      itemOnEdit: null
    });
  };

  changeHandler = i => event => {
    const newField = [...this.state.field];
    newField[i][event.target.name] = event.target.value;
    this.setState({
      field: newField
    });
  };

  saveEdit = async () => {
    const value = this.props.isList
      ? this.state.field
      : this.state.field[0][this.props.name];
    try {
      const rawResponse = await fetch(this.props.endpoint, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [this.props.name]: value })
      });

      const result = await rawResponse.json();
      if (result.error) {
        this.setState({
          isEditing: false,
          dataList: JSON.parse(JSON.stringify(this.props.data))
        });
      } else {
        this.setState({ isEditing: false, itemOnEdit: null });
      }
    } catch (e) {
      this.setState({ isEditing: true });
    }
  };

  addNew = event => {
    const newData = this.state.field.slice();
    let empty = {};
    for (let key of Object.keys(newData[0])) {
      empty[key] = '';
    }
    newData.push(empty);
    this.setState({
      field: newData,
      isEditing: true,
      itemOnEdit: newData.length - 1
    });
  };

  enterDeleteMode = () => {
    this.setState({
      isDeleteMode: true,
      isEditing: false,
      itemOnEdit: false,
      itemsToDelete: []
    });
  };

  addItemToDelete = i => event => {
    const newItemsToDelete = [...this.state.itemsToDelete];
    const index = newItemsToDelete.indexOf(i);
    if (index > -1) {
      newItemsToDelete.splice(index, 1);
    } else {
      newItemsToDelete.push(i);
    }
    this.setState({
      itemsToDelete: newItemsToDelete
    });
    console.log(this.state.field, this.state.itemsToDelete);
  };

  exitDeleteMode = event => {
    event.stopPropagation();
    this.setState({
      isDeleteMode: false,
      isEditing: false,
      itemOnEdit: false,
      itemsToDelete: []
    });
  };

  deleteElements = event => {
    event.stopPropagation();
    const newField = this.state.field.filter(
      (el, index) => !this.state.itemsToDelete.includes(index)
    );
    this.setState(
      {
        field: newField,
        isDeleteMode: false,
        isEditing: false,
        itemOnEdit: null,
        itemsToDelete: []
      },
      this.saveEdit
    );
  };

  render() {
    let renderContainerClasses = ['render-container'];
    if (this.props.bgImage) {
      renderContainerClasses.push('image');
    }
    if (this.state.isEditing) {
      renderContainerClasses.push('editing');
    }

    return (
      <div className={renderContainerClasses.join(' ')}>
        <div className="title-container">
          {this.props.title ? <h2>{this.props.title}</h2> : null}
          {this.props.isList && this.props.auth ? (
            <ManageList
              add={this.addNew}
              items={this.state.itemsToDelete.length}
              enterDeleteMode={this.enterDeleteMode}
              exitDeleteMode={this.exitDeleteMode}
              confirmDelete={this.deleteElements}
              isDeleteMode={this.state.isDeleteMode}
              isEditing={this.state.isEditing}
            />
          ) : null}
        </div>

        {this.state.field.map((el, index) => (
          <div className="field-container" key={this.props.name + index}>
            <RenderEditable
              isEditing={this.state.itemOnEdit === index}
              isDeleteMode={this.state.isDeleteMode}
              onStop={this.props.auth ? this.stopEditing : null}
              onStart={
                !this.props.auth
                  ? null
                  : !this.state.isDeleteMode
                    ? this.startEditing(index)
                    : this.addItemToDelete(index)
              }
              isToDelete={
                this.props.auth
                  ? this.state.itemsToDelete.includes(index)
                  : null
              }
              onChange={this.changeHandler(index)}
              onSave={this.props.auth ? this.saveEdit : null}
              type={this.props.type}
              options={this.props.options}
              infos={el}
              isList={this.props.isList}
              withLabel={this.props.withLabel}
              style={this.props.style}
              bgImage={this.props.bgImage}
            />
          </div>
        ))}
        <style jsx>{`
          .render-container {
            padding: 10px 20px;
          }

          .render-container.image {
            padding: 0;
            margin-top: 30px;
          }

          .render-container.image.editing,
          .render-container.editing {
            background: #eee;
          }

          .title-container {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            flex-flow: row wrap;
          }
          .field-container {
            display: flex;
            flex-flow: row;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }
}

export default Editable;