import {API, postAPICall} from '../../utils/AppApi';
import * as types from './ActionsTypes';
// import auth from '@react-native-firebase/auth';
// import {noteCollection, usersCollection} from '../../utils/FirebaseServices';
export const isLogin = payload => {
  return {
    type: types.IS_LOGIN,
    payload,
  };
};

export const setDefaultTime = payload => {
  return {
    type: types.DEFAULT_TIME,
    payload,
  };
};

export const setDefTaskTime = payload => {
  return {
    type: types.TIME,
    payload,
  };
};

export const setAdministration = payload => {
  return {
    type: types.ADMINISTRATION,
    payload,
  };
};
export const isDarkMode = payload => {
  return {
    type: types.DARKMODE,
    payload,
  };
};

export const isLoadding = payload => {
  return {
    type: types.IS_LOADING,
    payload,
  };
};

export const loginAction = payload => {
  return async dispatch => {
    // try {
    //   dispatch(isLoadding(true));
    //   const response = await postAPICall(API.login, payload);
    //   if (response.code === 0) {
    //     dispatch(isLoadding(false));
    //     dispatch(isLogin(true));
    dispatch({type: types.USER_DETAILS, payload: payload});
    //   } else {
    //     console.log('error part', response);
    //     dispatch(isLogin(false));
    //     dispatch(isLoadding(false));
    //   }
    // } catch (error) {
    //   console.log('error >> ', error);
    //   dispatch(isLoadding(false));
    //   dispatch(isLogin(false));
    // }
  };
};
// export const logout = () => {
//   console.log('logout +++++===');
//   auth()
//     .signOut()
//     .then(() => console.log('User signed out!'));
//   return {
//     type: types.LOGOUT,
//   };
// };
