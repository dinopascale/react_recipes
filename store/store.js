import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import {
  auth,
  snackbar,
  loading,
  toEdit,
  recipe,
  confirmationModal,
  newRecipe
} from './reducers';

const appReducer = combineReducers({
  auth,
  snackbar,
  loading,
  toEdit,
  recipe,
  newRecipe,
  confirmationModal
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
