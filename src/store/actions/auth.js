import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const loading = (load) => {
    return {
        type: actionTypes.LOADING,
        loading: load
    };
};

export const accessTokenUpdate = (data) => {
    return {
        type: actionTypes.ACCESS_TOKEN_UPDATE,
        data: data
    };
};

export const refreshTokenUpdate = (data) => {
    return {
        type: actionTypes.REFRESH_TOKEN_UPDATE,
        data: data
    };
};

export const imageUpdate = (data) => {
    return {
        type: actionTypes.IMAGE,
        data: data
    };
};
export const storeLocation = (data) => {
    return {
        type: actionTypes.STORE_LOCATION,
        data: data
    };
};

export const addressUpdate = (data) => {
    return {
        type: actionTypes.ADDRESS,
        data: data
    };
};

export const paymentUpdate = (data) => {
    return {
        type: actionTypes.PAYMENT,
        data: data
    };
};

export const orderUpdate = (data) => {
    return {
        type: actionTypes.ORDER,
        data: data
    };
};


export const nameUpdate = (data) => {
    return {
        type: actionTypes.NAME,
        data: data
    };
};

export const costUpdate = (data) => {
    return {
        type: actionTypes.COST,
        data: data
    };
};

export const placeOrderUpdate = (data) => {
    return {
        type: actionTypes.HISTORY,
        data: data
    };
};

