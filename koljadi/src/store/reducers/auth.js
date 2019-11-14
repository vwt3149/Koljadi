import * as actionTypes from '../actions/actionTypes';

const initialState = {
    idToken:null,
    localId:null,
    isLoading:false,
    error:null,
    profilePicture:null,
    userFullName:null
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        // case actionTypes.ON_SING_IN:
        //     return{
        //         ...state,
        //         isLoading:false
        //     }
        case actionTypes.ON_SING_IN_SUCCESS:
            return{
                ...state,
                isLoading:false,
                idToken: action.idToken,
                localId: action.localId
            }
        case actionTypes.ON_SING_IN_START:
            return{
                ...state,
                isLoading:true
            }
        case actionTypes.ON_SING_IN_FAIL:
            return{
                ...state,
                isLoading:false,
                error: action.error
            }
            case actionTypes.ON_SING_UP_SUCCESS:
            return{
                ...state,
                isLoading:false,
                idToken: action.idToken,
                localId: action.localId
            }
        case actionTypes.ON_SING_UP_START:
            return{
                ...state,
                isLoading:true
            }
        case actionTypes.ON_SING_UP_FAIL:
            return{
                ...state,
                isLoading:false,
                error: action.error
            }
        
        case actionTypes.ON_LOG_OUT:
            return{
                ...state,
                idToken:null,
                localId:null,
                profilePicture:null,
                userFullName:null
            }
        case actionTypes.ON_GOOGLE_SING_IN_START:
            return{
                ...state,
                isLoading: true,
                error:action.error
            }
        case actionTypes.ON_GOOGLE_SING_IN_FAIL:
            return{
                ...state,
                isLoading: false,
                error:action.error
            }
        case actionTypes.ON_GOOGLE_SING_IN_SUCCESS:
            return{
                ...state,
                isLoading: false,
                idToken: action.idToken,
                localId: action.localId,
                profilePicture:action.profilePicture,
                userFullName:action.userFullName
            }
        case actionTypes.ON_FACEBOOK_LOG_IN_START:
            return{
                ...state,
                isLoading: true,
                error:action.error
            }
        case actionTypes.ON_FACEBOOK_LOG_IN_FAIL:
            return{
                ...state,
                isLoading: false,
                error:action.error
            }
        case actionTypes.ON_FACEBOOK_LOG_IN_SUCCESS:
            return{
                ...state,
                isLoading: false,
                idToken: action.idToken,
                localId: action.localId,
                profilePicture:action.profilePicture,
                userFullName:action.userFullName
            }
        default:   
            return state;
    }
}

export default reducer;