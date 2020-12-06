import React, { useEffect } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './index.css';
import { connect } from 'react-redux';
import db from '../../firebaseConfig';
import { register } from '../../redux/actions/AuthActions';

const UI_CONFIG = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const LoginPage = ({ uid, registerUser }) => {
  useEffect(() => {
    if (uid) {
      db.collection('users')
        .doc(uid)
        .get()
        .then(resp => {
          const doesUserExist = resp.data();
          if (!doesUserExist) {
            registerUser(uid);
          }
        })
        .catch(err => alert(err));
    }
  }, [uid]);

  return (
    <StyledFirebaseAuth
      uiConfig={UI_CONFIG}
      firebaseAuth={firebase.auth()}
      className='login'
    />
  );
};

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: uid => dispatch(register(uid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
