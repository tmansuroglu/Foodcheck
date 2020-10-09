

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
        }).catch(err=>{dispatch({type:"SIGNOUT_FAILED",err})})
    }
}

// on catch err value is not being passed to reducer. why?


export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFireStore }) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection("users").doc(`${resp.user.uid}`).set({
                id: resp.user.uid,
                firstName: newUser.name,
                surname:newUser.surname,
                password: newUser.password,
                email: newUser.email,
                acctCreationDate: new Date(),
                birthdate: newUser.birthdate._d,
                gender: newUser.gender,
                height: newUser.height,
                weight: newUser.weight,
                 diet: {
                     breakfast: [],
                     lunch: [],
                     dinner: [],
                     snacks: []
                 }
            })
        }).then(() => {
            dispatch({ type: "SIGNUP_SUCCESS" })
        }).catch((err) => {
            dispatch({ type: "SIGNUP_FAILED", err })
        })
    }
}