const applyChanges = (
    newAmount,
    activeMealContent,
    newServingSizeObj,
    editTarget
) => {
    const copyOfActiveMealContent = [...activeMealContent];
    const weightPerServing =
        newServingSizeObj.serving_weight / newServingSizeObj.qty;
    const newNutrientsConsumed = {
        serving_size: newServingSizeObj.measure,
        serving_amount: newAmount,
        consumption_in_grams: weightPerServing * newAmount,
    };

    Object.entries(editTarget.nutrientsPerGram).forEach(nutrientName => {
        if (nutrientName[0] !== "serving_size")
            newNutrientsConsumed[nutrientName[0]] =
                nutrientName[1] * weightPerServing * newAmount;
    });
    const modifiedTarget = { ...editTarget };
    modifiedTarget.nutrientsConsumed = newNutrientsConsumed;
    let mealWithoutTargetFood = copyOfActiveMealContent.filter(
        meal => meal.id !== modifiedTarget.id
    );
    mealWithoutTargetFood = mealWithoutTargetFood ? mealWithoutTargetFood : [];
    const modifiedMealContent = [...mealWithoutTargetFood, modifiedTarget];

    return modifiedMealContent;
};

export default applyChanges;
