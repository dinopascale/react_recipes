import React from 'react';
import { connect } from 'react-redux';

import { createErrorMessage, callApi } from '../../store/actions';

const withCommentAPI = WrappedComponent => {
  class HOC extends React.Component {
    state = {
      list: [],
      newElement: '',
      listLoaded: false
    };

    loadData = async () => {
      const endpoint = `${this.props.baseURL}/${this.props.apiId}`;

      const options = {
        method: 'GET',
        credentials: 'include'
      };

      console.log(this.props);

      const re = await this.props.callApi(
        endpoint,
        options,
        json => {
          console.log(json);
          this.setState({
            listLoaded: true,
            list: json[this.props.type].map(el => {
              return {
                ...el,
                createdAt: new Date(el.createdAt),
                updatedAt: new Date(el.updatedAt)
              };
            })
          });
        },
        error => {
          this.props.onError({ status: error.status, message: error.message });
        }
      );

      console.log(re);
    };

    createNewElement = event => {
      this.setState({
        newElement: event.target.textContent
      });
    };

    submitNewElement = async () => {
      const text = this.state.newElement;

      const endpoint = `${this.props.baseURL}/${this.props.apiId}`;

      const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      };

      await this.props.callApi(
        endpoint,
        options,
        async () => {
          //   this.setState({
          //     newElement: ''
          //   });
          await this.loadData();
        },
        error => {
          this.props.onError({ status: error.status, message: error.message });
        }
      );
    };

    rateElement = i => async event => {
      const value = event.target.name === 'up' ? 1 : -1;
      const element = JSON.parse(JSON.stringify(this.state.list[i]));

      const endpoint = `/api/rate/c/${element._id}`;

      const options = {
        method: element.ratedBefore ? 'PATCH' : 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value })
      };

      await this.props.callApi(
        endpoint,
        options,
        () => {
          const newList = this.state.list.map((element, index) => {
            if (index === i) {
              return {
                ...element,
                userRate: value,
                totalRate: (element.totalRate - element.userRate || 0) + value,
                ratedBefore: true
              };
            }
            return element;
          });
          this.setState({ list: newList });
        },
        error => {
          this.props.onError({ status: error.status, message: error.message });
        }
      );
    };

    deleteElement = i => async () => {
      const elementToDelete = this.state.list[i];

      const endpoint = `${this.props.baseURL}/${elementToDelete._id}`;

      const options = {
        method: 'DELETE',
        credentials: 'include'
      };
      await this.props.callApi(
        endpoint,
        options,
        async () => await this.loadData(),
        error => {
          this.props.onError({ status: error.status, message: error.message });
        }
      );
    };

    render() {
      return (
        <WrappedComponent
          load={this.loadData}
          list={this.state.list}
          listLoaded={this.state.listLoaded}
          newEl={this.state.newElement}
          createNew={this.createNewElement}
          submitNew={this.submitNewElement}
          deleteElement={this.deleteElement}
          rate={this.rateElement}
          {...this.props}
        />
      );
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      callApi: (endpoint, options, onSuccess, onFail) =>
        dispatch(callApi(endpoint, options, onSuccess, onFail)),
      onError: error => dispatch(createErrorMessage(error))
    };
  };

  return connect(
    null,
    mapDispatchToProps
  )(HOC);
};

export default withCommentAPI;
