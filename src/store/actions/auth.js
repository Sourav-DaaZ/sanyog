import * as actionTypes from './actionTypes';


export const loading = (load) => {
    return {
        type: actionTypes.LOADING,
        loading: load
    };
};
