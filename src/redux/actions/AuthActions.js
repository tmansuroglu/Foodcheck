import db from '../../firebaseConfig';

export const SignOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'SIGNOUT_FAILED', err: err.message });
      });
  };
};

export const register = uid => {
  return dispatch => {
    db.collection('users')
      .doc(uid)
      .set({
        diet: {},
      })
      .then(() => {
        dispatch({ type: 'USERDATA_CREATION_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'USERDATA_CREATION_FAILED', err: err.message });
      });
  };
};
