const DietReducer = (state = { meals: [] }, action) => {
    console.log(action.err ? `error is: ${action.err}` : "");
    switch (action.type) {
        case "CREATE_DIET":
            console.log("CREATE_DIET", action.mealName);
            return {
                ...state,
                dietError: null,
            };
        case "CREATE_DIET_FAILED":
            console.log("CREATE_DIET_FAILED", action.err);
            return {
                ...state,
                dietError: action.err,
            };
        case "CREATE_MEAL":
            console.log("CREATE_MEAL", action.mealName); //fix this
            return {
                ...state,
                dietError: null,
            };
        case "ADD_FOOD":
            console.log(
                "ADD_FOOD EXECUTED. ",
                action.mealName,
                "=>",
                action.food
            );
            return {
                ...state,
                dietError: null,
            };
        case "ADD_FOOD_FAILED":
            console.log("ADD_FOOD_FAILED");
            return {
                ...state,
                dietError: action.err,
            };
        default:
            return state;
    }
};

export default DietReducer;
