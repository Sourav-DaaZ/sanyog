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

