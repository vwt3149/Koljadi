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
        localId: authData.localId,
        error: null
    }
}

const onSingInFail = error => {
    return{
        type: actionTypes.ON_SING_IN_FAIL,
        error
    }
}

const onSingInStart = () => {
    return{
        type: actionTypes.ON_SING_IN_START,
        error: null
    }
}

const onSingUpSuccess = authData => {
    return{
        type: actionTypes.ON_SING_UP_SUCCESS,
        idToken: authData.idToken,
        localId: authData.localId,
        error: null
    }
}

const onSingUpFail = error => {
    return{
        type: actionTypes.ON_SING_UP_FAIL,
        error
    }
}

const onSingUpStart = () => {
    return{
        type: actionTypes.ON_SING_UP_START,
        error: null
    }
}

const onExpiration = expirationTime => {
    return dispatch =>{
        setTimeout(() => {
            dispatch(onLogOut())
        }, expirationTime * 1000);
    }
   
}

export const onLogOut = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');
    localStorage.removeItem('expiration');
    return{
        type:actionTypes.ON_LOG_OUT
    }
}



export const onSingUp = (email,password) => {
    return async (dispatch) => {
        dispatch(onSingUpStart());
        const payload ={
            email,
            password,
            returnSecureToken: true
        }
        try {
            const response = await axios.post(ENDPOINTS.SINGUP+ENDPOINTS.API, payload);
            const {data} = response;
            dispatch(onSingUpSuccess(data));
            dispatch(onExpiration(data.expiresIn));
            const expires = new Date( new Date().getTime() + data.expiresIn * 1000 )
            localStorage.setItem('idToken', data.idToken);
            localStorage.setItem('localId', data.localId);
            localStorage.setItem('expiration', expires);
            // localStorage.setItem('expiration', expiresIn);
        } catch (error) {
            dispatch(onSingUpFail(error.response.data.error))
        }
    }
}

export const onSingIn = (email,password) => {
    return async (dispatch) => {
        dispatch(onSingInStart());
        const payload ={
            email,
            password,
            returnSecureToken: true
        }
        try {
            const response = await axios.post(ENDPOINTS.SINGIN+ENDPOINTS.API, payload);
            const {data} = response;
            dispatch(onSingInSuccess(data));
            dispatch(onExpiration(data.expiresIn));
            const expires = new Date( new Date().getTime() + data.expiresIn * 1000 )
            localStorage.setItem('idToken', data.idToken);
            localStorage.setItem('localId', data.localId);
            localStorage.setItem('expiration', expires);
            // localStorage.setItem('expiration', expiresIn);
        } catch (error) {
            dispatch(onSingInFail(error.response.data.error))
        }
    }
}

export const onCheckSingInState = () =>{
    return dispatch => {
        const localId = localStorage.getItem('expiration');
        if (!localId) {
            dispatch(onLogOut());
        } else {
            
            const expires = new Date(localStorage.getItem('expiration'));
            if (expires.getTime() > new Date().getTime()) {
                const idToken = localStorage.getItem('idToken');
                dispatch(onSingInSuccess({idToken,localId}));
                dispatch(onExpiration(3600));
            }
        }

    }
}

