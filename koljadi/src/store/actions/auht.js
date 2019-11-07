import axios from 'axios';
import * as actionTypes from './actionTypes';

const ENDPOINTS = {
    SINGUP:'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
    SINGIN:'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
    API:'AIzaSyBhypgymYLiYwFNKk2Nldr9Vwl9EmQQjMk'
}

const onSingInSuccess = authData => {
    return{
        type: actionTypes.ON_SING_IN_SUCCESS,
        idToken: authData.idToken,
        localId: authData.localId
    }
}

const onSingInSuccess = error => {
    return{
        type: actionTypes.ON_SING_IN_FAIL,
        error
    }
}
export const onSingIn = () => {
    try {
    
    } catch (error) {
        
    }
}