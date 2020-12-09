const applyChanges = (
  selectedServingAmount,
  activeMealContent,
  newServingSizeObj,
  editTarget
) => {
  const copyOfActiveMealContent = [...activeMealContent];

  const weightPerServing =
    newServingSizeObj.serving_weight / newServingSizeObj.qty;

  const newNutrientsConsumed = {
    serving_size: newServingSizeObj.measure,
    serving_amount: selectedServingAmount,
    consumption_in_grams: weightPerServing * selectedServingAmount,
  };

  Object.entries(editTarget.nutrientsPerGram).forEach(nutrientNameAndAmount => {
    const nutrientName = nutrientNameAndAmount[0];
    const nutrientAmountInGr = nutrientNameAndAmount[1];
    if (nutrientName !== 'serving_size')
      newNutrientsConsumed[nutrientName] =
        nutrientAmountInGr * weightPerServing * selectedServingAmount;
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
