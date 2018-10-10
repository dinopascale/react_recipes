import { actionTypes } from './actions';

const authInitialState = {
  user: null
};

const confirmationModaInitialState = {
  isOpen: false
};

const snackbarInitialState = {
  isOpen: false,
  message: null
};

const toEditInitialState = {
  item: {}
};

const recipeInitialState = null;

const newRecipeInitialState = {
  schema: [],
  values: null
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

export const confirmationModal = (
  state = confirmationModaInitialState,
  action
) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return {
        ...state,
        isOpen: true
      };
    case actionTypes.HIDE_MODAL:
      return {
        ...state,
        isOpen: false
      };
    default:
      return state;
  }
};

export const snackbar = (state = snackbarInitialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_SNACKBAR:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.NEW_ERROR_MESSAGE:
    case actionTypes.SUCCESS_DELETE_RECIPE:
    case actionTypes.FAIL_DELETE_RECIPE:
    case actionTypes.SUCCESS_SUBMIT_RECIPE:
    case actionTypes.FAIL_SUBMIT_RECIPE:
      return {
        ...state,
        isOpen: true,
        message: action.payload
      };
    case actionTypes.HIDE_SNACKBAR:
      return {
        ...state,
        isOpen: false,
        message: ''
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
      const { username, avatar, bio } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          username,
          avatar,
          bio
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

export const recipe = (state = recipeInitialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_RECIPE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export const newRecipe = (state = newRecipeInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SCHEMA:
      return {
        ...state,
        schema: [...state.schema, ...action.payload]
      };
    case actionTypes.SET_VALUES_FORM:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload
        }
      };
    default:
      return state;
  }
};
