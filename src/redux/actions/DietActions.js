export const CreateDiet = (diet) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirebase().firestore();
        const profile = getState().firebase.profile;
        console.log("profile is", profile)
        const userID = getState().firebase.auth.uid;
        console.log("userID", userID, "tarkan")
        firestore.collection("users").doc(userID).set().then(() => {
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