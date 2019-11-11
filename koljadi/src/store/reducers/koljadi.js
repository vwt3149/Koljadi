import {
    ON_GET_KOLJADI_START,
    ON_GET_KOLJADI_SUCCESS,
    ON_GET_KOLJADI_FAIL,
} from '../actions/actionTypes';
const initialState  = { 
    koljadi: null,
    isLoading: false,
    error: null
}

function reducer(state = initialState, action){
    switch (action.type) {
        case ON_GET_KOLJADI_START:
           return{
               ...state,
               isLoading:true,
               error: action.error
           }
        case ON_GET_KOLJADI_SUCCESS:
           return{
               ...state,
               isLoading: false,
               koljadi: action.koljadi,
               error: action.error
           }
        case ON_GET_KOLJADI_START:
           return{
               ...state,
               isLoading: false,
               error: action.error
           }
        default:
            return state;
    }
}

export default reducer;