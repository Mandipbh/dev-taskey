import * as types from '../Actions/ActionsTypes';

const initialState = {
  login: false,
  onBoarding: false,
  userDetails: '',
  isDarkMode: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.IS_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case types.DARKMODE:
      return {
        ...state,
        isDarkMode: action.payload,
      };
    case types.ONBOARDING:
      return {
        ...state,
        onBoarding: action.payload,
      };
    case types.USER_DETAILS: {
      return {
        ...state,
        userDetails: action.payload,
      };
    }
    case types.LOGOUT:
      return {
        initialState,
      };
    case types.DELETEACCOUNT:
      return {
        initialState,
      };
    default:
      return state;
  }
};
