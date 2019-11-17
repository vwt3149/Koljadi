import axios from 'axios';
import firebase from 'firebase';
import * as actionTypes from './actionTypes';

const ENDPOINTS = {
    SINGUP:'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
    SINGIN:'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
    API:'AIzaSyBhypgymYLiYwFNKk2Nldr9Vwl9EmQQjMk',
}

const firebaseConfig = {
    apiKey: "AIzaSyBhypgymYLiYwFNKk2Nldr9Vwl9EmQQjMk",
    authDomain: "koljadi.firebaseapp.com",
    databaseURL: "https://koljadi.firebaseio.com",
    projectId: "koljadi",
    storageBucket: "koljadi.appspot.com",
    messagingSenderId: "979777711006",
    appId: "1:979777711006:web:4abc70a5ad979349c9c48f"
  };



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
    console.log(authData,'[Auth data]')
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

const onExpiration = (expirationTime) => {
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

const onGoogleSingInStart = () => {
    return{
        type: actionTypes.ON_GOOGLE_SING_IN_START,
        error: null
    }
}

const onGoogleSingInFail = (error) => {
    return{
        type: actionTypes.ON_GOOGLE_SING_IN_FAIL,
        error
    }
}

const onGoogleSingInSuccess = (authData) => {
    return{
        type: actionTypes.ON_GOOGLE_SING_IN_SUCCESS,
        idToken: authData.credential.idToken,
        localId: authData.user.uid,
        profilePicture: authData.user.photoURL,
        userFullName: authData.user.displayName
    }
}

export const onGoogleSingIn = () => {
   return async dispatch =>{
       dispatch(onGoogleSingInStart())
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            const provider = await new firebase.auth.GoogleAuthProvider();
            const response = await firebase.auth().signInWithPopup(provider);
            console.log(response,'[GOOGLE AUTH DATA]');
            dispatch(onGoogleSingInSuccess(response));
            const expires = new Date( new Date().getTime() + 3600 * 1000 )
            localStorage.setItem('idToken', response.credential.idToken);
            localStorage.setItem('localId', response.user.uid);
            localStorage.setItem('expiration', expires);
        } catch (error) {
            console.log(error.message,"[Error message]");
            dispatch(onGoogleSingInFail(error));
        }
   }
}

const onFacebookLogInStart = () => {
    return{
        type: actionTypes.ON_FACEBOOK_LOG_IN_START,
        error: null
    }
}

const onFacebookLogInFail = (error) => {
    return{
        type: actionTypes.ON_FACEBOOK_LOG_IN_FAIL,
        error
    }
}

const onFacebookLogInSuccess = (authData) => {
    return{
        type: actionTypes.ON_FACEBOOK_LOG_IN_SUCCESS,
        idToken: authData.credential.idToken,
        localId: authData.user.uid,
        profilePicture: authData.user.photoURL,
        userFullName: authData.user.displayName
    }
}

export const onFacebookLogIn = () => {
    return async dispatch => {
        dispatch(onFacebookLogInStart());
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            const provider = await new firebase.auth.FacebookAuthProvider();
            const response = await firebase.auth().signInWithPopup(provider);
            dispatch(onFacebookLogInSuccess(response));
            console.log(response)
            const expires = new Date( new Date().getTime() + 3600 * 1000 )
            localStorage.setItem('idToken', response.credential.idToken);
            localStorage.setItem('localId', response.user.uid);
            localStorage.setItem('expiration', expires);
        } catch (error) {
            console.log(error);
            dispatch(onFacebookLogInFail(error))
        }
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
        const localId = localStorage.getItem('localId');
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

