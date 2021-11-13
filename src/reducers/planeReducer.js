import { combineReducers } from "redux";

const INITIAL_STATE = {
  token: null,
  username: null,
  auth: true,
};

const planeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_TOKEN": {
      return {
        ...state,
        // and update the copy with the new value
        token: action.payload,
      };
    }

    case "LOADING": {
      return {
        ...state,
        // and update the copy with the new value
        loading: action.payload,
      };
    }

    case "AUTHORIZE": {
      return {
        ...state,
        // and update the copy with the new value
        auth: action.payload,
      };
    }

    default:
      return state;
  }
};


export default combineReducers({
  planeApp: planeReducer,
});
