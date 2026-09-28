
import {
  SET_LOADING,
  SET_USER_DETAILS,
} from './types';

export const setLoading = value => dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: value,
  });
};

export const setUserDetails = value => dispatch => {
  dispatch({
    type: SET_USER_DETAILS,
    payload: value,
  });
};


