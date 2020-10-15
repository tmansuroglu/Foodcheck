export const ascCalories = (obj1, obj2) =>
    obj1.nutrientsConsumed.calories - obj2.nutrientsConsumed.calories;

export const descCalories = (obj1, obj2) =>
    obj2.nutrientsConsumed.calories - obj1.nutrientsConsumed.calories;

export const ascProtein = (obj1, obj2) =>
    obj1.nutrientsConsumed.protein - obj2.nutrientsConsumed.protein;

export const descProtein = (obj1, obj2) =>
    obj2.nutrientsConsumed.protein - obj1.nutrientsConsumed.protein;

export const ascFat = (obj1, obj2) =>
    obj1.nutrientsConsumed.total_fat - obj2.nutrientsConsumed.total_fat;

export const descFat = (obj1, obj2) =>
    obj2.nutrientsConsumed.total_fat - obj1.nutrientsConsumed.total_fat;

export const ascCarbo = (obj1, obj2) =>
    obj1.nutrientsConsumed.total_carbohydrate -
    obj2.nutrientsConsumed.total_carbohydrate;

export const descCarbo = (obj1, obj2) =>
    obj2.nutrientsConsumed.total_carbohydrate -
    obj1.nutrientsConsumed.total_carbohydrate;

export const ascName = (obj1, obj2) =>
    obj1.food_name.localeCompare(obj2.food_name);

export const descName = (obj1, obj2) =>
    obj2.food_name.localeCompare(obj1.food_name);
