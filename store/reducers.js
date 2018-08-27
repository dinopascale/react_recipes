import { actionTypes } from './actions';

const initialState = {
  user: null,
  loading: false
};

export const errorMessage = (state = null, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_FAIL:
    case actionTypes.NEW_ERROR_MESSAGE:
      return action.payload;
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
};

// export const auth = (state = initialState.auth, action) => {
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRY_LOGIN:
    case actionTypes.TRY_LOGOUT:
      return {
        ...state,
        loading: true
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: {
          ...action.payload
        }
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        user: null
      };
    default:
      return state;
  }
};
