//import {firebase, googleAuthProvider} from '../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};



//Create a if statement to check if there is a budget object and its "creation" 
//property is true, if not create it, if so change nothing. Make it possible to edit
//the object, not constantly change and replace object