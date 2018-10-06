import Router from 'next/router';
import apiEndpoints from '../frontend/utils/apiEndpoints';

export const actionTypes = {
  TRY_LOGIN: 'TRY_LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  TRY_LOGOUT: 'TRY_LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAIL: 'LOGOUT_FAIL',
  NEW_ERROR_MESSAGE: 'NEW_ERROR_MESSAGE',
  SHOW_SNACKBAR: 'SHOW_SNACKBAR',
  HIDE_SNACKBAR: 'HIDE_SNACKBAR',
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  START_LOADING: 'START_LOADING',
  STOP_LOADING: 'STOP_LOADING',
  ADD_ITEM_TOEDIT: 'ADD_ITEM_TOEDIT',
  EXIT_EDIT: 'EXIT_EDIT',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  ADD_RECIPE: 'ADD_RECIPE',
  TRY_DELETE_RECIPE: 'TRY_DELETE_RECIPE',
  SUCCESS_DELETE_RECIPE: 'SUCCESS_DELETE_RECIPE',
  FAIL_DELETE_RECIPE: 'FAIL_DELETE_RECIPE'
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
      const e = new Error(json.meta.message || rawResponse.statusText);
      e.status = rawResponse.status;
      throw e;
    }
    dispatch({ type: actionTypes.STOP_LOADING });
    successCallBack(json);
  } catch (e) {
    dispatch({ type: actionTypes.STOP_LOADING });
    failCallBack(e);
  }
};

export const callApiP = (endpoint, options) => async dispatch => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const rawResponse = await fetch(endpoint, options);
    const json = await rawResponse.json();

    if (rawResponse.status !== 200) {
      const e = new Error(json.meta.message || rawResponse.statusText);
      e.status = rawResponse.status;
      throw e;
    }
    dispatch({ type: actionTypes.STOP_LOADING });
    return json;
  } catch (e) {
    dispatch({ type: actionTypes.STOP_LOADING });
    throw new Error(e);
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

export const editUserInfo = () => (dispatch, getState) => {
  const { user } = getState().auth;
  dispatch(addItemToEdit(user));
  Router.push(`/edit?id=${user._id}&isUser=true`, `/edit_user/${user._id}`);
};

export const editRecipeInfo = () => (dispatch, getState) => {
  const recipe = getState().recipe;
  dispatch(addItemToEdit(recipe));
  Router.push(
    `/edit?id=${recipe._id}&isRecipe=true`,
    `/edit_recipe/${recipe._id}`
  );
};

export const exitEdit = (type, newInfo = null, withSave = false) => (
  dispatch,
  getState
) => {
  const { item } = getState().toEdit;
  const as = type === 'user' ? `/u/me` : `/r/${item._id}`;
  const href =
    type === 'user'
      ? `/user?userId=${item._id}&isMe=true`
      : `/recipe?id=${item._id}&isRecipe=true`;

  Router.push(href, as);

  if (newInfo && type === 'user') {
    dispatch({ type: actionTypes.UPDATE_USER_INFO, payload: newInfo });
  }

  if (withSave) {
    const message =
      type === 'user'
        ? 'User updated successfully'
        : 'Recipe updated successfully';
    dispatch(successSnackbar(message));
  }
};

// export const tryDeleteRecipe = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: actionTypes.START_LOADING });
//     const recipe = getState().recipe;
//     const { endpoint, options } = apiEndpoints.deleteRecipe;

//     const rawResponse = await fetch(endpoint + `/${recipe._id}`, options);
//     const json = await rawResponse.json();

//     if (rawResponse.status !== 200) {
//       const e = new Error(json.meta.message || rawResponse.statusText);
//       e.status = rawResponse.status;
//       throw e;
//     }

//     dispatch({ type: actionTypes.STOP_LOADING });
//     dispatch(successSnackbar('Recipe deleted'));

//     Router.push('/recipes');
//   } catch (e) {
//     dispatch({
//       type: actionTypes.FAIL_DELETE_RECIPE,
//       payload: 'Recipe not deleted'
//     });
//   }
// };

//Action creator

export const openModal = () => {
  return {
    type: actionTypes.SHOW_MODAL
  };
};

export const closeModal = () => {
  return {
    type: actionTypes.HIDE_MODAL
  };
};

export const successSnackbar = message => {
  return {
    type: actionTypes.SHOW_SNACKBAR,
    payload: message
  };
};

export const successLogin = userInfo => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: userInfo
  };
};

export const failLogin = message => {
  return {
    type: actionTypes.LOGIN_FAIL,
    payload: message
  };
};

export const successLogout = message => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    payload: message
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

export const addRecipe = recipe => {
  return {
    type: actionTypes.ADD_RECIPE,
    payload: recipe
  };
};
