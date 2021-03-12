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

