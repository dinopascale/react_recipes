import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

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
  STOP_LODADING: 'STOP_LOADING'
};

//MIDDLEWARES

export const tryLogin = (email, password) => async dispatch => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const rawResponse = await fetch('/api/user/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const json = await rawResponse.json();

    if (rawResponse.status !== 200) {
      const e = new Error(json.error.message);
      e.status = rawResponse.status;
      throw e;
    }

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: json.userInfo
    });
    Router.push('/');
  } catch (e) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: { message: e.message, status: e.status }
    });
  }
};

export const tryLogout = () => async dispatch => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const rawResponse = await fetch('/api/user/me/logout', {
      method: 'POST',
      credentials: 'include'
    });

    if (rawResponse.status !== 200) {
      console.log(rawResponse.statusText, rawResponse.status);
      const e = new Error(rawResponse.statusText);
      e.status = rawResponse.status;
      throw e;
    }

    const json = await rawResponse.json();

    dispatch({
      type: actionTypes.LOGOUT_SUCCESS,
      payload: json.userInfo
    });
  } catch (e) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      payload: e.message
    });
  }
};

export const createErrorMessage = error => dispatch => {
  return dispatch({
    type: actionTypes.NEW_ERROR_MESSAGE,
    payload: error
  });
};
