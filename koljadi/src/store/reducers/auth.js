import * as actionTypes from '../actions/actionTypes';

const initialState = {
    idToken:null,
    localId:null,
    isLoading:false,
    error:null
}

const reducer = (state = initialState, action) =>{
    switch (action.types) {
        case actionTypes.ON_SING_IN:
            return{
                ...state,
                isLoading:false
            }
        case actionTypes.ON_SING_IN_SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        default:   
            return state;
    }
}

export default reducer;