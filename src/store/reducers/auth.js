import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utils';

const initialState = {
  access_token: null,
  refresh_token: null,
  loading: false,
  image: null,
  store_location: {},
  name: '',
  address: '',
  order: [],
  payment: {}
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

const imageUpdate = (state, action) => {
  return updateObject(state, {
    image: `data:image/jpeg;base64,${action.data}`,
  });
};
const nameUpdate = (state, action) => {
  return updateObject(state, {
    name: action.data
  });
};
const addressUpdate = (state, action) => {
  return updateObject(state, {
    address: action.data
  });
};

const orderUpdate = (state, action) => {
  const data = [...state.order, ...action.data];
  return updateObject(state, {
    order: data
  });
};

const paymentUpdate = (state, action) => {
  return updateObject(state, {
    payment: action.data
  });
};

const storeLocation = (state, action) => {
  return updateObject(state, {
    store_location: action.data,
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
    case actionTypes.IMAGE:
      return imageUpdate(state, action);
    case actionTypes.STORE_LOCATION:
      return storeLocation(state, action);
    case actionTypes.NAME:
      return nameUpdate(state, action);
    case actionTypes.ADDRESS:
      return addressUpdate(state, action);
    case actionTypes.ADDRESS:
      return addressUpdate(state, action);
    case actionTypes.ORDER:
      return orderUpdate(state, action);
    case actionTypes.PAYMENT:
      return paymentUpdate(state, action);
    default:
      return state;
  }
};

export default reducer;
