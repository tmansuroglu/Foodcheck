import { Redirect } from "react-router-dom";
import React from "react";

export const SignIn = user => {
    //user parameter comes from LoginForm line 36
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase(); // reference to db
        firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(() => {
                console.log("dispatch");
                dispatch({ type: "LOGIN_SUCCESS" });
            })
            .then(() => <Redirect to="/diet" />)
            .catch(err => {
                console.log(err);
                dispatch({ type: "LOGIN_ERROR", err: err.message });
            });
    };
};

export const SignOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log("dispatch");
                dispatch({ type: "SIGNOUT_SUCCESS" });
            })
            .catch(err => {
                dispatch({ type: "SIGNOUT_FAILED", err: err.message });
            });
    };
};

// on catch err value is not being passed to reducer. why?

export const signUp = newUser => {
    return (dispatch, getState, { getFirebase, getFireStore }) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();
        firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then(resp => {
                return firestore
                    .collection("users")
                    .doc(`${resp.user.uid}`)
                    .set({
                        id: resp.user.uid,
                        password: newUser.password,
                        email: newUser.email,
                        diet: {},
                        dietStats: {},
                    });
            })
            .then(() => {
                dispatch({ type: "SIGNUP_SUCCESS" });
            })
            .catch(err => {
                dispatch({ type: "SIGNUP_FAILED", err: err.message });
            });
    };
};
