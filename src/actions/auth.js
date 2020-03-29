import { firebase, googleAuthProvider } from '../firebase/firebase';

// LOGIN
export const login = ({userID}={}) => ({
  type: 'LOGIN',
  userID: userID
});

export const startLogin = () => {
  return(dispatch) => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

// LOGOUT
export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return(dispatch) => {
    return firebase.auth().signOut();
  }
}
