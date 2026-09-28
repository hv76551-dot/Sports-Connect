import {
  SET_LOADING,
  SET_USER_DETAILS,
} from '../actions/types';

const initialState = {
  is_loading: false,
  user:{}
};

const updateState = (state, key, payload) => ({
  ...state,
  [key]: payload,
  
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return updateState(state, 'is_loading', action.payload);
      case SET_USER_DETAILS:
        return updateState(state, 'user', action.payload);
    default:
      return state;
  }
}
