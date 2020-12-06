import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './index.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import db from '../../firebaseConfig';
import { register } from '../../redux/actions/AuthActions';

const UI_CONFIG = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const LoginPage = ({ uid, registerUser }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        .then(() => setIsLoggedIn(true))
        .catch(err => alert(err));
    }
  }, [uid, registerUser]);

  if (!isLoggedIn) {
    return (
      <StyledFirebaseAuth
        uiConfig={UI_CONFIG}
        firebaseAuth={firebase.auth()}
        className='login'
      />
    );
  }
  return <Redirect to='/diet' />;
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
