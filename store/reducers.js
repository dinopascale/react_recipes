import { actionTypes } from './actions';

export const initialState = {
  auth: {
    user: null,
    loading: false,
    errorMex: ''
  }
};

export const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case actionTypes.TRY_LOGIN:
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
        errorMex: action.payload,
        user: null
      };
    case actionTypes.TRY_LOGOUT:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
