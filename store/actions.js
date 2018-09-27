export const actionTypes = {
  TRY_LOGIN: 'TRY_LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  TRY_LOGOUT: 'TRY_LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAIL: 'LOGOUT_FAIL',
  NEW_ERROR_MESSAGE: 'NEW_ERROR_MESSAGE',
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  START_LOADING: 'START_LOADING',
  STOP_LODADING: 'STOP_LOADING',
  ADD_ITEM_TOEDIT: 'ADD_ITEM_TOEDIT',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO'
};

//MIDDLEWARES

export const callApi = (
  endpoint,
  options,
  successCallBack,
  failCallBack
) => async dispatch => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const rawResponse = await fetch(endpoint, options);
    const json = await rawResponse.json();
    if (rawResponse.status !== 200) {
      const e = new Error(json.error.message || rawResponse.statusText);
      e.status = rawResponse.status;
      throw e;
    }
    dispatch({ type: actionTypes.STOP_LODADING });
    successCallBack(json);
  } catch (e) {
    dispatch({ type: actionTypes.STOP_LODADING });
    failCallBack(e);
  }
};

export const successAndCloseModal = () => dispatch => {
  dispatch({
    type: actionTypes.SHOW_MODAL,
    modalType: true
  });
  setTimeout(() => {
    dispatch({
      type: actionTypes.HIDE_MODAL
    });
  }, 2000);
};

export const removeItemToEdit = (
  isUser = false,
  newUser = null
) => dispatch => {
  if (isUser) {
    dispatch({ type: actionTypes.UPDATE_USER_INFO, payload: newUser });
  }
};

//Action creator

export const successLogin = userInfo => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: userInfo
  };
};

export const failLogin = error => {
  const { message, status } = error;
  return {
    type: actionTypes.LOGIN_FAIL,
    payload: { message, status }
  };
};

export const successLogout = userInfo => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    payload: userInfo
  };
};

export const failLogout = error => {
  return {
    type: actionTypes.LOGOUT_FAIL,
    payload: error.message
  };
};

export const createErrorMessage = error => {
  return {
    type: actionTypes.NEW_ERROR_MESSAGE,
    payload: error
  };
};

export const addItemToEdit = item => {
  return {
    type: actionTypes.ADD_ITEM_TOEDIT,
    payload: item
  };
};
