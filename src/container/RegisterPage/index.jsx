import React from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import RegisterForm from '../../components/RegisterForm';
// import db from '../../firebaseConfig';

const UI_CONFIG = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

const RegisterPage = () => {
  return (
    <>
      <StyledFirebaseAuth uiConfig={UI_CONFIG} firebaseAuth={firebase.auth()} />
    </>
  );
};

export default RegisterPage;
