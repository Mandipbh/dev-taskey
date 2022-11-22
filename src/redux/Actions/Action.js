import axios from 'axios';
import * as ActionTypes from '../ActionTypes';

export const setTask = data => {
  return {
    type: ActionTypes.TASKS,
    payload: data,
  };
};

export const getTask = () => {
  return dispatch => {
    axios
      .get('https://taskey-app.herokuapp.com/api/task')
      .then(responce => {
        dispatch(setTask(responce.data));
      })
      .catch(err => console.log('error :', err));
  };
};
