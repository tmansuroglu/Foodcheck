export const CreateMeal = (mealName, mealOrder) => {
    console.log(
        "createMeal action is being executed with meal name:",
        mealName,
        "and meal order: ",
        mealOrder
    );
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirebase().firestore();
        const userID = getState().firebase.auth.uid;
        const userDoc = firestore.collection("users").doc(userID);

        let userProfile = "";
        userDoc
            .get()
            .then(resp => (userProfile = { ...resp.data() }))
            .then(() => {
                console.log("userProfile is", userProfile);
                console.log("meal order is ", mealOrder);
                console.log("mealName is", mealName);
                userDoc.set({
                    ...userProfile,
                    diet: {
                        ...userProfile.diet,
                        [mealOrder]: [],
                    },
                });
            })
            .then(() => {
                dispatch({ type: "CREATE_MEAL", mealName, mealOrder });
            })
            .catch(err => {
                dispatch({ type: "CREATE_MEAL_FAILED", err: err.message });
            });
    };
};

export const AddFood = (mealName, food, mealOrder) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
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
                // console.log("data is", userProfile.diet);
                // console.log("meal order is ", mealOrder);
                // console.log("mealName is", mealName);

                // userDoc.set({

                // });
                userDoc.set({
                    ...userProfile,
                    diet: {
                        ...userProfile.diet,
                        [mealOrder]: [...userProfile.diet[mealOrder], food],
                    },
                });
                // console.log(
                //     "user diet Profile is",
                //     userProfile.diet,
                //     "meal order is:",
                //     mealOrder,
                //     "food is: ",
                //     food,
                //     "meal name is",
                //     mealName
                // );
            })
            .then(() => {
                dispatch({ type: "ADD_FOOD", mealName, food, mealOrder });
            })
            .catch(err => {
                dispatch({ type: "ADD_FOOD_FAILED", err: err.message });
            });
    };
};
