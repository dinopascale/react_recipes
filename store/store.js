import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { auth, initialState } from './reducers';

const appReducer = combineReducers({
  auth
});

const rootReducer = (state = initialState, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    state = undefined;
  }
  return appReducer(state, action);
};

export function initStore(initState = initialState) {
  return createStore(
    rootReducer,
    initState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
