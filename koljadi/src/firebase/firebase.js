import firebase from 'firebase';

export function firebaseInit(){
    const firebaseConfig = {
        apiKey: "AIzaSyBhypgymYLiYwFNKk2Nldr9Vwl9EmQQjMk",
        authDomain: "koljadi.firebaseapp.com",
        databaseURL: "https://koljadi.firebaseio.com",
        projectId: "koljadi",
        storageBucket: "koljadi.appspot.com",
        messagingSenderId: "979777711006",
        appId: "1:979777711006:web:4abc70a5ad979349c9c48f"
      };
     if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
}

export async function firebaseResetPasswordEmail(email){
    try {
       const response =  firebase.auth().sendPasswordResetEmail(email);
       console.log(response);
    } catch (error) {
        console.log(error)
        console.log(error.response)
    }
   
}