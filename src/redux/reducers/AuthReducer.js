const AuthReducer = (state = {}, action) => {  // takes a description of action as action parameter for example LOG_IN(from actions folder), if there is a match changes the state 
    switch (action.type) {
        case "LOGIN_ERROR":
            console.log("LOGIN_ERROR")
            return {
                ...state,
                authError: "Login Failed"
            }
        case "LOGIN_SUCCESS":
            console.log("LOGIN_SUCCESS")
            return {
                ...state,
                authError: null
            }
        case "SIGNOUT_SUCCESS":
            console.log("SIGNOUT_SUCCES")
            return state;
        case "SIGNUP_SUCCESS":
            console.log("SIGNUP_SUCCESS")
            return {
                ...state,
                authError: null
            }
        case "SIGNUP_FAILED":
            console.log("SIGNUP_FAILED")
            return {
                ...state,
                authError: "SIGNUP_FAILED"//state.AuthReducer.authError //? does this work
            }
        default:
            return state
    }

}

export default AuthReducer;
