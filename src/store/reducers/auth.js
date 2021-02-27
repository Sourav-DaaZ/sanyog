import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    error: null,
    loading: false,
    message: null,
    authRedirectPath: null,
};

const loading= (state, action) => {
    return updateObject( state, {
        loading: action.loading
    });
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOADING: return loading(state,action);
        default:
            return state;
    }
};

export default reducer;