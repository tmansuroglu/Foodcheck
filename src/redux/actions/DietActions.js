export const CreateMeal = mealName => {
    console.log(
        "createMeal action is being executed with meal name:",
        mealName
    );
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const userID = getState().firebase.auth.uid;
        const userDoc = firestore.collection("users").doc(userID);

        let userProfile = "";
        userDoc
            .get()
            .then(resp => (userProfile = { ...resp.data() }))
            .then(() => {
                console.log("mealName is", mealName);
                console.log(userProfile);
                userDoc.set({
                    ...userProfile,
                    diet: {
                        ...userProfile.diet,
                        [mealName]: [],
                    },
                });
            })
            .then(() => {
                dispatch({ type: "CREATE_MEAL", mealName });
            })
            .catch(err => {
                dispatch({ type: "CREATE_MEAL_FAILED", err: err.message });
            });
    };
};
//rework this
export const AddFood = (mealName, mealObj) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const userID = getState().firebase.auth.uid;
        const userDoc = firestore.collection("users").doc(userID);
        let userProfile = "";
        userDoc
            .get()
            .then(resp => {
                userProfile = { ...resp.data() };
            })
            .then(() => {
                console.log("mealName is ", mealName);
                //console.log("userProfile.diet[mealName] is", userProfile.diet);
                userDoc.set({
                    ...userProfile,
                    diet: {
                        ...userProfile.diet,
                        [mealName]: [
                            ...userProfile.diet[mealName],
                            { ...mealObj },
                        ],
                    },
                });
            })
            .then(() => {
                dispatch({ type: "ADD_FOOD", mealName, mealObj });
            })
            .catch(err => {
                dispatch({ type: "ADD_FOOD_FAILED", err: err.message });
            });
    };
};

export const ActiveMeal = (mealName, mealContent) => ({
    type: "MEAL_SELECTED",
    mealName,
    mealContent,
});

// this is for deleting fix the name
export const SetDiet = dietData => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const userID = getState().firebase.auth.uid;
        const userDoc = firestore.collection("users").doc(userID);
        let userProfile = "";
        userDoc
            .get()
            .then(resp => {
                userProfile = { ...resp.data() };
            })
            .then(() => {
                userDoc.set({
                    ...userProfile,
                    diet: {
                        ...dietData,
                    },
                });
            })
            .then(() => {
                dispatch({ type: "DIET_SET", dietData });
            })
            .catch(err => {
                dispatch({ type: "DIET_SET_FAILED", err: err.message });
            });
    };
};

export const SetMeal = (mealName, mealData) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const userID = getState().firebase.auth.uid;
        const userDoc = firestore.collection("users").doc(userID);
        let userProfile = "";
        userDoc
            .get()
            .then(resp => {
                userProfile = { ...resp.data() };
            })
            .then(() => {
                userDoc.set({
                    ...userProfile,
                    diet: {
                        ...userProfile.diet,
                        [mealName]: [...mealData],
                    },
                });
            })
            .then(() => {
                dispatch({ type: "MEAL_SET", mealData, mealName });
            })
            .catch(err => {
                dispatch({ type: "MEAL_SET_FAILED", err: err.message });
            });
    };
};

export const setStats = (dailyMacroObj, mealsMacrosObj) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const userID = getState().firebase.auth.uid;
        const userDoc = firestore.collection("users").doc(userID);
        let userProfile = "";
        userDoc
            .get()
            .then(resp => {
                userProfile = { ...resp.data() };
            })
            .then(() => {
                userDoc.set({
                    ...userProfile,
                    dietStats: {
                        dailyStats: dailyMacroObj,
                        mealsStats: mealsMacrosObj,
                    },
                });
            })
            .then(() => {
                dispatch({ type: "STATS_SET", dailyMacroObj, mealsMacrosObj });
            })
            .catch(err => {
                dispatch({ type: "STATS_SET_FAILED", err: err.message });
            });
    };
};

export const setFoodDetails = foodDetails => ({
    type: "SET_FOOD_DETAILS",
    foodDetails,
});
