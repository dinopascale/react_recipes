import React from 'react';

const withFilter = (WrappedComponent, defaultValue) => {
  class HOC extends React.Component {
    state = {
      sortBy: defaultValue
    };

    selectSortOptions = (event, option) => {
      this.setState({
        sortBy: option || event.target.value
      });
    };

    render() {
      return (
        <WrappedComponent
          sorted={this.selectSortOptions}
          sortBy={this.state.sortBy}
          {...this.props}
        />
      );
    }
  }

  return HOC;
};

export default withFilter;
