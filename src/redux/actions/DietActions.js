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
                        [mealName]: {},
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
export const AddFood = (mealName, food) => {
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
                        ...[userProfile.diet],
                        [mealName]: food,
                    },
                });
            })
            .then(() => {
                dispatch({ type: "ADD_FOOD", mealName, food });
            })
            .catch(err => {
                dispatch({ type: "ADD_FOOD_FAILED", err: err.message });
            });
    };
};

//rework this
export const ActiveMeal = (mealName, mealContent) => ({
    type: "MEAL_SELECTED",
    mealName,
    mealContent,
});

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
