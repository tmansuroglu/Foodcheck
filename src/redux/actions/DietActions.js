export const CreateMeal = (mealName, mealOrder) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirebase().firestore();
        const userID = getState().firebase.auth.uid;
        const userData = firestore.collection("users").doc(userID);
        const profile = getState().firebase.profile;
        userData
            .set(
                {
                    diet: {
                        [mealOrder]: { [mealName]: [] },
                    },
                },
                { merge: true }
            )
            .then(() => {
                dispatch({ type: "CREATE_DIET", mealName });
            })
            .catch(err => {
                dispatch({ type: "CREATE_DIET_FAILED", err });
            });
    };
};

export const AddFood = (mealName, food, mealOrder) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirebase().firestore();
        const userID = getState().firebase.auth.uid;
        const userData = firestore.collection("users").doc(userID);
        let dietData = "";
        const profile = getState().firebase.profile;
        userData
            .get()
            .then(resp => (dietData = resp.data().diet))
            .then(() =>
                userData.set(
                    {
                        diet: {
                            ...dietData,
                            [mealOrder]: {
                                [mealName]: [
                                    ...dietData[mealOrder][mealName],
                                    food,
                                ],
                            },
                        },
                    },
                    { merge: true }
                )
            )
            .then(() => {
                dispatch({ type: "ADD_FOOD", mealName, food });
            })
            .catch(err => {
                dispatch({ type: "ADD_FOOD_FAILED", err });
            });
    };
};
