import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActionButton from '../../ActionButton';
import Dropdown from './manageList/Dropdown';

class ManageList extends Component {
  state = {
    isOpen: false && !this.props.isEditing
  };

  toggleDropdown = event => {
    event.stopPropagation();
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  addAndCloseDropdown = event => {
    event.stopPropagation();
    this.setState({
      isOpen: false
    });
    this.props.add();
  };

  deleteModeAndCloseDropdown = event => {
    event.stopPropagation();
    this.setState({
      isOpen: false
    });
    this.props.enterDeleteMode();
  };

  render() {
    let dropdownMenu = null;
    let manageDeleteMode = null;
    let icon = <FontAwesomeIcon icon="ellipsis-v" />;
    if (this.props.isEditing) {
      icon = null;
    }
    if (this.props.isDeleteMode) {
      icon = null;
      const styleBtn = {
        backgroundColor: '#eee',
        borderRadius: '3px',
        flex: '1 0 30%',
        marginRight: '10px'
      };
      manageDeleteMode = (
        <div className="row-delete">
          <ActionButton
            customStyle={styleBtn}
            handleClick={this.props.confirmDelete}
            icon="trash"
          >
            {this.props.items} elements
          </ActionButton>
          <ActionButton
            customStyle={styleBtn}
            handleClick={this.props.exitDeleteMode}
            icon="ban"
          >
            Exit
          </ActionButton>
          <style jsx>{`
            .row-delete {
              display: flex;
              margin-bottom: 10px;
            }
          `}</style>
        </div>
      );
    }
    if (this.state.isOpen && !this.props.isEditing) {
      const items = [
        { value: 'Add new', handleClick: this.addAndCloseDropdown },
        { value: 'Delete', handleClick: this.deleteModeAndCloseDropdown }
      ];
      dropdownMenu = <Dropdown items={items} />;
    }
    return (
      <div
        className={
          this.props.isDeleteMode ? 'manage-list deleting' : 'manage-list'
        }
        onClick={this.toggleDropdown}
      >
        {icon}
        {manageDeleteMode}
        {dropdownMenu}
        <style jsx>{`
          .manage-list {
            position: relative;
          }

          .manage-list.deleting {
            flex: 1 0 100%;
          }
        `}</style>
      </div>
    );
  }
}

export default ManageList;
