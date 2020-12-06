import { Redirect } from 'react-router-dom';
import React from 'react';
import db from '../../firebaseConfig';

// export const SignIn = user => {
//   //user parameter comes from LoginForm line 36
//   return (dispatch, getState, { getFirebase }) => {
//     const firebase = getFirebase(); // reference to db
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(user.email, user.password)
//       .then(() => {
//         console.log('dispatch');
//         dispatch({ type: 'LOGIN_SUCCESS' });
//       })
//       .then(() => <Redirect to='/diet' />)
//       .catch(err => {
//         console.log(err);
//         dispatch({ type: 'LOGIN_ERROR', err: err.message });
//       });
//   };
// };

export const SignOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('dispatch');
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'SIGNOUT_FAILED', err: err.message });
      });
  };
};

// export const signUp = newUser => {
//   return (dispatch, getState, { getFirebase, getFireStore }) => {
//     const firebase = getFirebase();
//     const firestore = getFirebase().firestore();
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(newUser.email, newUser.password)
//       .then(resp => {
//         return firestore.collection('users').doc(`${resp.user.uid}`).set({
//           id: resp.user.uid,
//           password: newUser.password,
//           email: newUser.email,
//           diet: {},
//           dietStats: {},
//         });
//       })
//       .then(() => {
//         dispatch({ type: 'SIGNUP_SUCCESS' });
//       })
//       .catch(err => {
//         dispatch({ type: 'SIGNUP_FAILED', err: err.message });
//       });
//   };
// };

export const register = uid => {
  return dispatch => {
    db.collection('users')
      .doc(uid)
      .set({
        diet: {},
      })
      .then(() => {
        dispatch({ type: 'USERDATA_CREATION_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'USERDATA_CREATION_FAILED', err: err.message });
      });
  };
};
