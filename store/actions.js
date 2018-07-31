import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

export const actionTypes = {
  TRY_LOGIN: 'TRY_LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  TRY_LOGOUT: 'TRY_LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAIL: 'LOGOUT_FAIL'
};

//MIDDLEWARES

export const tryLogin = (email, password) => dispatch => {
  return fetch('/api/user/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(resp => resp.json(), error => error.json())
    .then(json => {
      if (json.userInfo) {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: json.userInfo
        });
        Router.push('/');
      } else {
        dispatch({
          type: actionTypes.LOGIN_FAIL,
          payload: json.error.message
        });
      }
    });
};

export const tryLogout = () => dispatch => {
  return fetch('/api/user/me/logout', {
    method: 'POST',
    credentials: 'include'
  })
    .then(resp => resp.json(), error => error.json())
    .then(json => {
      if (json.status === 'Ok') {
        dispatch({
          type: actionTypes.LOGOUT_SUCCESS
        });
      } else {
        dispatch({
          type: actionTypes.LOGOUT_FAIL,
          payload: json.message
        });
      }
    });
};
