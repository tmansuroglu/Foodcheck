const DietReducer = (state = [], action) => {
    // console.log(action.err ? `error is: ${action.err}` : "");
    switch (action.type) {
        case "CREATE_MEAL":
            console.log("CREATE_MEAL", action.mealName);
            return {
                ...state,
                diet: { ...state.meals, [action.mealOrder]: [] },
                dietError: null,
            };
        case "CREATE_MEAL_FAILED":
            console.log("CREATE_MEAL_FAILED", action.err);
            return {
                ...state,
                dietError: action.err,
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
                diet: {
                    ...state.meals,
                    [action.mealOrder]: [
                        ...state.diet[(action.mealOrder, action.food)],
                    ],
                },
                dietError: null,
            };
        case "ADD_FOOD_FAILED":
            console.log("ADD_FOOD_FAILED", action.err);
            return {
                ...state,
                dietError: action.err,
            };
        default:
            return state;
    }
};

export default DietReducer;
