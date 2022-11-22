import * as ActionTypes from '../ActionTypes';

const initialState = {
  task: [],
  //   loading: true,
  //   errorMessage: '',
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TASKS:
      //   console.log(action.payload);
      return {...state, task: action.payload};

    default:
      return state;
  }
};

export default Reducer;
