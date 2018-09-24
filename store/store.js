import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { auth, errorMessage, modal, loading, toEdit } from './reducers';

const appReducer = combineReducers({
  auth,
  errorMessage,
  modal,
  loading,
  toEdit
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    state = undefined;
  }
  return appReducer(state, action);
};

export function initStore(state = {}) {
  return createStore(
    rootReducer,
    state,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
