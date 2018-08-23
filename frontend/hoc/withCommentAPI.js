import React from 'react';
import apiCall from '../utils/apiCall';

const withCommentAPI = WrappedComponent => {
  class HOC extends React.Component {
    state = {
      list: [],
      newElement: '',
      loading: false
    };

    loadData = async () => {
      this.setState({
        loading: true
      });

      const options = {
        method: 'GET',
        credentials: 'include'
      };

      const json = await apiCall(
        `${this.props.baseURL}/${this.props.apiId}`,
        options
      );

      if (json.status) {
        this.setState({
          loading: false,
          list: json[this.props.type].map(el => {
            return {
              ...el,
              createdAt: new Date(el.createdAt),
              updatedAt: new Date(el.updatedAt)
            };
          })
        });
      } else {
        console.log(json);
      }
    };

    createNewElement = event => {
      this.setState({
        newElement: event.target.textContent
      });
    };

    submitNewElement = async () => {
      const text = this.state.newElement;
      const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      };

      const json = await apiCall(
        `${this.props.baseURL}/${this.props.apiId}`,
        options
      );
      if (json.status) {
        this.setState({
          newElement: ''
        });
        await this.loadData();
      } else {
        console.log(json);
      }
    };

    rateElement = i => async event => {
      const value = event.target.name === 'up' ? 1 : -1;
      const element = JSON.parse(JSON.stringify(this.state.list[i]));

      const options = {
        method: element.ratedBefore ? 'PATCH' : 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value })
      };

      const json = await apiCall(`/api/rate/c/${element._id}`, options);

      if (json.status) {
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
      } else {
        //error handler
      }
    };

    deleteElement = i => async () => {
      const elementToDelete = this.state.list[i];
      const options = {
        method: 'DELETE',
        credentials: 'include'
      };
      try {
        const json = await apiCall(
          `${this.props.baseURL}/${elementToDelete._id}`,
          options
        );
        if (json.status) {
          await this.loadData();
        } else {
          console.log(json);
        }
      } catch (e) {}
    };

    render() {
      return (
        <WrappedComponent
          load={this.loadData}
          list={this.state.list}
          loading={this.state.loading}
          new={this.state.newElement}
          createNew={this.createNewElement}
          submitNew={this.submitNewElement}
          delete={this.deleteElement}
          rate={this.rateElement}
          {...this.props}
        />
      );
    }
  }

  return HOC;
};

export default withCommentAPI;
