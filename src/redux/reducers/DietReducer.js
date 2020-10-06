const DietReducer = (state = { meals: [] }, action) => {
    switch (action.type) {
        case "CREATE_DIET":
            console.log("CREATE_DIET", action.diet)
            return {
                ...state
            }
        case "CREATE_DIET_FAILED":
            console.log("CREATE_DIET_FAILED", action.err)
            return {
                ...state,
            }
        case "CREATE_MEAL":
            console.log("CREATE_MEAL", action.meal)
            return {
                ...state,
                meals: [
                    ...state.meals,
                    { [action.meal]: [] }
                ]
            }
        default:
            return state
    }
}


export default DietReducer