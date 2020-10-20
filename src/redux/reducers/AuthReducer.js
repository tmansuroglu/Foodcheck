const AuthReducer = (state = {}, action) => {
    // takes a description of action as action parameter for example LOG_IN(from actions folder), if there is a match changes the state

    //err gets reseted why? Do not delete
    // console.log(action.err ? `error is: ${action.err}` : "");
    switch (action.type) {
        case "LOGIN_ERROR":
            console.log("LOGIN_ERROR", action.err);
            return {
                ...state,
                authError: action.err
                    ? action.err
                    : "Action.err is broken Login Failed",
            };
        case "LOGIN_SUCCESS":
            console.log("LOGIN_SUCCESS");
            return {
                ...state,
                authError: null,
            };
        case "SIGNOUT_SUCCESS":
            console.log("SIGNOUT_SUCCES");

            return state;
        case "SIGNUP_SUCCESS":
            console.log("SIGNUP_SUCCESS");
            return {
                ...state,
                authError: null,
            };
        case "SIGNUP_FAILED":
            console.log("SIGNUP_FAILED", action.err);
            return {
                ...state,
                authError: action.err
                    ? action.err
                    : "Action.err is broken SIGNUP_FAILED",
            };
        default:
            return state;
    }
};

export default AuthReducer;
