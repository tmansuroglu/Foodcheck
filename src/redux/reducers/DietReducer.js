const DietReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_MEAL':
      return {
        ...state,
        diet: { ...state.diet, [action.mealName]: [] },
        dietError: null,
      };
    case 'CREATE_MEAL_FAILED':
      return {
        ...state,
        dietError: action.err,
      };
    case 'ADD_FOOD':
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
    case 'ADD_FOOD_FAILED':
      return {
        ...state,
        dietError: action.err,
      };
    case 'MEAL_SELECTED':
      return {
        ...state,
        activeMeal: { [action.mealName]: action.mealContent },
      };
    case 'DIET_SET':
      return state;
    case 'DIET_SET_FAILED':
      return {
        ...state,
        dietError: action.err,
      };
    case 'MEAL_SET':
      return {
        ...state,
        activeMeal: {
          [action.mealName]: action.mealData,
        },
      };
    case 'MEAL_SET_FAILED':
      return {
        ...state,
        dietError: action.err,
      };
    case 'STATS_SET':
      return {
        ...state,
        dietStats: {
          dailyStats: action.dailyMacroObj,
          mealsStats: action.mealsMacrosObj,
        },
      };
    case 'STATS_SET_FAILED':
      return {
        ...state,
        dietError: action.err,
      };
    case 'SET_FOOD_DETAILS':
      return {
        ...state,
        foodDetails: action.foodDetails,
      };

    default:
      return state;
  }
};

export default DietReducer;
