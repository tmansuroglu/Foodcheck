const DietReducer = (state = {}, action) => {
    // console.log(action.err ? `error is: ${action.err}` : "");
    switch (action.type) {
        case "CREATE_MEAL":
            console.log("CREATE_MEAL", action.mealName);
            return {
                ...state,
                diet: { ...state.diet, [action.mealName]: [] },
                dietError: null,
            };
        case "CREATE_MEAL_FAILED":
            console.log("CREATE_MEAL_FAILED", action.err);
            return {
                ...state,
                dietError: action.err,
            };
        case "ADD_FOOD":
            return {
                ...state,
                activeMeal: {
                    [action.mealName]: [
                        ...state.activeMeal[action.mealName],
                        action.mealObj,
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
        case "MEAL_SELECTED":
            console.log("MEAL SELECTED", action.mealName, action.mealContent);
            return {
                ...state,
                activeMeal: { [action.mealName]: action.mealContent },
            };
        case "DIET_SET":
            console.log("DIET_SET", action.dietData);
            return state;
        case "DIET_SET_FAILED":
            console.log("DIET_SET_FAILED");
            return {
                ...state,
                dietError: action.err,
            };
        case "MEAL_SET":
            console.log("MEAL_SET");
            return {
                ...state,
                activeMeal: {
                    [action.mealName]: action.mealData,
                },
            };
        case "MEAL_SET_FAILED":
            console.log("MEAL_SET_FAILED");
            return {
                ...state,
                dietError: action.err,
            };
        case "STATS_SET":
            console.log("STATS SET");
            return {
                ...state,
                dietStats: {
                    dailyStats: action.dailyMacroObj,
                    mealsStats: action.mealsMacrosObj,
                },
            };
        case "STATS_SET_FAILED":
            return {
                ...state,
                dietError: action.err,
            };
        case "SET_FOOD_DETAILS":
            return {
                ...state,
                foodDetails: action.foodDetails,
            };

        default:
            return state;
    }
};

export default DietReducer;
