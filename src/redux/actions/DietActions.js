export const CreateDiet = (diet) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirebase().firestore();
        const profile = getState().firebase.profile;
        const userID = getState().firebase.auth.uid;
        firestore.collection("diets").add({
            ...diet,
            userID,
            email: profile.email,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: "CREATE_DIET", diet })
        }).catch((err) => {
            dispatch({ type: "CREATE_DIET_FAILED", err })
        })
    }
}


export const createMeal = (meal) => {
    return (
        { type: "CREATE_MEAL", meal }
    )
}