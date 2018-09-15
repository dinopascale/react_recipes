import React, { Component } from 'react';

class DropdownList extends Component {
  state = {
    isOpen: false
  };

  toggleShow = event => {
    event.stopPropagation();
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  close = event => {
    event.stopPropagation();
    this.setState({
      isOpen: false
    });
  };

  componentDidMount() {
    if (window) {
      window.addEventListener('click', this.close, false);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('click', this.close, false);
    }
  }

  render() {
    return this.props.render(this.state.isOpen, this.toggleShow, this.close);
  }
}

export default DropdownList;
