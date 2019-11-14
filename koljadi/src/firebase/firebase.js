import firebase from 'firebase';

 function firebaseInit(){
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
    firebaseInit()
    try {
       const response =  firebase.auth().sendPasswordResetEmail(email,null);
       console.log(response);
    } catch (error) {
        console.log(error)
        console.log(error.response)
    }
   
}

// export async function firebaseGoogleSingIn(){
//     firebaseInit();
//     try {
//         const provider = await new firebase.auth.GoogleAuthProvider();
//         const data = await firebase.auth().signInWithPopup(provider);
//         // console.log(data, "Firebae singin")
//         // console.log(provider)
//     } catch (error) {
//         // console.log(error)
//     }
// }