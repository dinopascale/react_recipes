import { actionTypes } from './actions';

const authInitialState = {
  user: null
};

const modalInitialState = {
  isOpen: false,
  message: null
};

const toEditInitialState = {
  item: {}
};

export const loading = (state = null, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return true;
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOGOUT_SUCCESS:
    case actionTypes.LOGOUT_FAIL:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.STOP_LOADING:
      return false;
    default:
      return state;
  }
};

export const modal = (state = modalInitialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_FAIL:
    case actionTypes.NEW_ERROR_MESSAGE:
    case actionTypes.SHOW_MODAL:
      return {
        ...state,
        isOpen: true,
        message: action.payload
      };
    case actionTypes.HIDE_MODAL:
      return {
        ...state,
        isOpen: false,
        message: null
      };
    default:
      return state;
  }
};

export const auth = (state = authInitialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          ...action.payload
        }
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        user: null
      };
    case actionTypes.UPDATE_USER_INFO:
      const { username, avatar } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          username,
          avatar
        }
      };
    default:
      return state;
  }
};

export const toEdit = (state = toEditInitialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_TOEDIT:
      return {
        ...state,
        item: {
          ...action.payload
        }
      };
    default:
      return state;
  }
};
