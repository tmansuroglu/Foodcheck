

export const SignIn = (user) => {  //user parameter comes from LoginForm line 36
    return (dispatch, getState, { getFirebase, }) => {
        const firebase = getFirebase() // reference to db
        firebase.auth().signInWithEmailAndPassword(
            user.email,
            user.password
        ).then(() => {
            dispatch({ type: "LOGIN_SUCCESS" })
        }).catch((err) => {
            dispatch({ type: "LOGIN_ERROR", err })
        })

    }
}


export const SignOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        firebase.auth().signOut().then(() => {
            dispatch({ type: "SIGNOUT_SUCCESS" })
        })
    }
}

//dispatch is the action being passed to the reducer. it is the action being halted


export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFireStore }) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection("users").doc(resp.user.uid).set({
                email: newUser.email,
                password: newUser.password,
                diet: {}
            })
        }).then(() => {
            dispatch({ type: "SIGNUP_SUCCESS" })
        }).catch((err) => {
            dispatch({ type: "SIGNUP_FAILED", err })
        })
    }
}