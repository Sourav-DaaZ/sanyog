import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utils';

const initialState = {
  access_token: null,
  refresh_token: null,
  loading: false
};

const loading = (state, action) => {
  return updateObject(state, {
    loading: action.loading,
  });
};

const accessTokenUpdate = (state, action) => {
  return updateObject(state, {
    access_token: action.data,
  });
};

const refreshTokenUpdate = (state, action) => {
  return updateObject(state, {
    refresh_token: action.data,
  });
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return loading(state, action);
    case actionTypes.ACCESS_TOKEN_UPDATE:
      return accessTokenUpdate(state, action);
    case actionTypes.REFRESH_TOKEN_UPDATE:
      return refreshTokenUpdate(state, action);
    default:
      return state;
  }
};

export default reducer;
