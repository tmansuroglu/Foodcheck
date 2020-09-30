const isLoggedIn = (state = "false", action) => {  // takes a description of action as action parameter for example LOG_IN(from actions folder), if there is a match changes the state 
    switch (action.type) {
        case "LOG_IN":
            return state = true
        case "LOG_OUT": // didn't implement this yet
            return state = false
        default:
            return state

    }
}

export default isLoggedIn;