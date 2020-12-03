const foodAdder = (
    addFood,
    createdFood,
    activeMealName,
    selectedFoodMeasure,
    amount
) => {
    console.log(amount);
    const copyOfFoodDetails = { ...createdFood };

    //clears data

    delete copyOfFoodDetails.full_nutrients;
    delete copyOfFoodDetails.brand_name;
    delete copyOfFoodDetails.consumed_at;
    delete copyOfFoodDetails.lat;
    delete copyOfFoodDetails.lang;
    delete copyOfFoodDetails.metadata;
    delete copyOfFoodDetails.is_raw_food;
    delete copyOfFoodDetails.ndb_no;
    delete copyOfFoodDetails.meal_type;
    delete copyOfFoodDetails.nix_brand_id;
    delete copyOfFoodDetails.nix_brand_name;
    delete copyOfFoodDetails.nix_item_id;
    delete copyOfFoodDetails.nix_item_name;
    delete copyOfFoodDetails.source;
    delete copyOfFoodDetails.sub_recipe;
    delete copyOfFoodDetails.tags;
    delete copyOfFoodDetails.upc;
    delete copyOfFoodDetails.lng;

    // alt measures contain all measures. this finds user selected measure from there
    const selectedFoodMeasureDetails = createdFood.alt_measures.find(
        eachType => eachType.measure === selectedFoodMeasure
    );

    //  finds gram weight per selected serving size

    const selectedFoodMeasureInGrams =
        selectedFoodMeasureDetails.serving_weight /
        selectedFoodMeasureDetails.qty;

    const amountConsumedInGrams = amount * selectedFoodMeasureInGrams;

    // nutrients in default serving size
    const nutrients = [
        copyOfFoodDetails.nf_calories,
        copyOfFoodDetails.nf_cholesterol,
        copyOfFoodDetails.nf_dietary_fiber,
        copyOfFoodDetails.nf_p,
        copyOfFoodDetails.nf_potassium,
        copyOfFoodDetails.nf_protein,
        copyOfFoodDetails.nf_saturated_fat,
        copyOfFoodDetails.nf_sodium,
        copyOfFoodDetails.nf_sugars,
        copyOfFoodDetails.nf_total_carbohydrate,
        copyOfFoodDetails.nf_total_fat,
    ];

    const nutrientNames = [
        "calories",
        "cholesterol",
        "fibers",
        "p",
        "potassium",
        "protein",
        "saturated_fat",
        "sodium",
        "sugars",
        "total_carbohydrate",
        "total_fat",
    ];

    let nutrientsPerGramArr = [];
    const consumedNutrientValues = nutrients.map(nutrients => {
        const nutrientsPerGram =
            nutrients / copyOfFoodDetails.serving_weight_grams;
        nutrientsPerGramArr.push(nutrientsPerGram);
        return nutrientsPerGram * amountConsumedInGrams;
    });

    const nutrientsConsumed = {
        consumption_in_grams: amountConsumedInGrams,
        serving_size: selectedFoodMeasureDetails.measure,
        serving_amount: amount,
    };

    const nutrientsNamesAndValuesPerGram = {
        serving_size: "g",
    };
    //matches consumed nutrient values and names and puts them into nutrients consumed obj
    for (let i = 0; i < consumedNutrientValues.length; i++) {
        nutrientsConsumed[nutrientNames[i]] =
            Math.round(consumedNutrientValues[i] * 100) / 100;
    }
    copyOfFoodDetails.nutrientsConsumed = nutrientsConsumed;

    //matches nutrient values per gram and names and puts them into nutrientsPergram obj
    for (let i = 0; i < nutrientsPerGramArr.length; i++) {
        nutrientsNamesAndValuesPerGram[nutrientNames[i]] =
            nutrientsPerGramArr[i];
    }
    copyOfFoodDetails.nutrientsPerGram = nutrientsNamesAndValuesPerGram;
    const randomID = Math.random().toString(36).substr(2, 9);
    copyOfFoodDetails.id = randomID;

    // deletes nutrientNames arr elemets. "nf" section is not included but for some reason it works ?
    for (let i = 0; i < nutrientNames.length; i++) {
        delete copyOfFoodDetails[nutrientNames[i]];
    }
    //clears data
    delete copyOfFoodDetails.nf_calories;
    delete copyOfFoodDetails.nf_cholesterol;
    delete copyOfFoodDetails.nf_dietary_fiber;
    delete copyOfFoodDetails.nf_p;
    delete copyOfFoodDetails.nf_potassium;
    delete copyOfFoodDetails.nf_protein;
    delete copyOfFoodDetails.nf_saturated_fat;
    delete copyOfFoodDetails.nf_sodium;
    delete copyOfFoodDetails.nf_sugars;
    delete copyOfFoodDetails.nf_total_carbohydrate;
    delete copyOfFoodDetails.nf_total_fat;
    delete copyOfFoodDetails.serving_qty;
    delete copyOfFoodDetails.serving_unit;
    delete copyOfFoodDetails.serving_weight_grams;

    addFood(activeMealName, copyOfFoodDetails);
    return copyOfFoodDetails;
};

export default foodAdder;
