import * as ActionTypes from '../ActionTypes';

const initialState = {
  task: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TASKS:
      return {...state, task: action.payload};

    default:
      return state;
  }
};

export default Reducer;
