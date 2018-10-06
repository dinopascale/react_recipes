import React from 'react';
import { connect } from 'react-redux';

import { callApiP } from '../../store/actions';
import apiEndpoints from '../utils/apiEndpoints';

class ThreadsListApi extends React.Component {
  state = {
    list: [],
    showNewElement: false,
    idElementEditing: null,
    listLoaded: false,
    error: false
  };

  _newElementRef = null;
  _editables = {};

  loadData = async () => {
    const { callApiP, type, id } = this.props;

    const { endpoint, options } =
      type === 'threads' ? apiEndpoints.getThreads : apiEndpoints.getComments;

    const dynamicEndpoint = endpoint + '/' + id;

    try {
      const json = await callApiP(dynamicEndpoint, options);
      const list = json.data[type].map(el => {
        return {
          ...el,
          createdAt: new Date(el.createdAt),
          updatedAt: new Date(el.updatedAt)
        };
      });

      this.setState({
        list,
        listLoaded: true
      });
    } catch (e) {
      this.setState({
        listLoaded: true,
        error: true
      });
    }
  };

  showNewElement = () => {
    this.setState(
      prevState => ({
        showNewElement: true
      }),
      () => {
        this._newElementRef.focus();
      }
    );
  };

  hideNewElement = () => {
    this.setState({
      showNewElement: false
    });
  };

  setNewElRef = ref => {
    this._newElementRef = ref;
  };

  submitNew = async () => {
    const { callApiP, type, id } = this.props;

    const text = this._newElementRef.textContent;

    if (text === '') {
      return false;
    }

    const { endpoint, options } =
      type === 'threads' ? apiEndpoints.postThread : apiEndpoints.postComment;

    const dynamicEndpoint = endpoint + '/' + id;
    const optionsWithBody = { ...options, body: JSON.stringify({ text }) };

    try {
      const json = await callApiP(dynamicEndpoint, optionsWithBody);
      const newElement = {
        ...json.data.element,
        createdAt: new Date(json.data.element.createdAt),
        updatedAt: new Date(json.data.element.updatedAt)
      };

      const newList = [newElement, ...this.state.list];

      this.setState({
        list: newList,
        showNewElement: false
      });
    } catch (e) {
      this.setState({
        error: true
      });
    }
  };

  setEditableElement = id => ref => {
    if (!ref) {
      return false;
    }
    this._editables[id] = ref;
  };

  enterEditMode = id => {
    if (id === this.state.idElementEditing) {
      return this.exitEditMode();
    }

    this.setState(
      prevState => ({
        idElementEditing: id
      }),
      () => {
        this._editables[id].focus();
      }
    );
  };

  exitEditMode = () => {
    this.setState({
      idElementEditing: null
    });
  };

  submitChangeElement = async commentId => {
    const { callApiP, type } = this.props;

    const text = this._editables[commentId].textContent;
    if (text === '') {
      return false;
    }

    const { endpoint, options } =
      type === 'threads' ? apiEndpoints.editThread : apiEndpoints.editComment;
    const dynamicEndpoint = endpoint + '/' + commentId;
    const optionsWithBody = { ...options, body: JSON.stringify({ text }) };

    try {
      const json = await callApiP(dynamicEndpoint, optionsWithBody);
      const updatedElement = json.data.element;

      const updatedList = this.state.list.map(element => {
        if (element._id !== updatedElement._id) {
          return element;
        } else {
          return {
            ...element,
            text: updatedElement.text,
            updatedAt: new Date(updatedElement.updatedAt)
          };
        }
      });

      this.setState({
        list: updatedList,
        idElementEditing: null
      });
    } catch (e) {
      this.setState({
        error: true
      });
    }
  };

  deleteElement = async commentId => {
    const { callApiP, type } = this.props;

    const { endpoint, options } =
      type === 'threads'
        ? apiEndpoints.deleteThread
        : apiEndpoints.deleteComment;
    const dynamicEndpoint = endpoint + '/' + commentId;

    try {
      await callApiP(dynamicEndpoint, options);

      const updatedList = this.state.list.filter(
        element => element._id !== commentId
      );
      const updatedRefList = Object.keys(this._editables)
        .filter(key => key !== commentId)
        .map(key => this._editables[key]);

      this._editables = { ...updatedRefList };
      this.setState({
        list: updatedList,
        idElementEditing: null
      });
    } catch (e) {
      this.setState({
        error: true
      });
    }
  };

  rateElement = i => async event => {
    const value = event.target.name === 'up' ? 1 : -1;
    const element = JSON.parse(JSON.stringify(this.state.list[i]));

    const { callApiP } = this.props;

    const { endpoint, options } = element.ratedBefore
      ? apiEndpoints.alreadyRateThread
      : apiEndpoints.firstRateThread;
    const dynamicEndpoint = endpoint + '/' + element._id;
    const optionsWithBody = { ...options, body: JSON.stringify({ value }) };

    try {
      await callApiP(dynamicEndpoint, optionsWithBody);

      const updatedList = this.state.list.map((el, index) => {
        if (index === i) {
          return {
            ...el,
            userRate: value,
            totalRate: (el.totalRate - el.userRate || 0) + value,
            ratedBefore: true
          };
        }
        return el;
      });

      this.setState({
        list: updatedList
      });
    } catch (e) {
      this.setState({
        error: true
      });
    }
  };

  componentWillUnmount() {
    console.log('unmount');
  }

  render() {
    return this.props.render(
      this.state,
      this.loadData,
      this.showNewElement,
      this.hideNewElement,
      this.setNewElRef,
      this.submitNew,
      this.setEditableElement,
      this.enterEditMode,
      this.exitEditMode,
      this.submitChangeElement,
      this.deleteElement,
      this.rateElement
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    callApiP: (endpoint, options) => dispatch(callApiP(endpoint, options))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ThreadsListApi);
