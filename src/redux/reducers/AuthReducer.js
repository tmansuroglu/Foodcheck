const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIGNOUT_SUCCESS':
      console.log('SIGNOUT_SUCCES');
      return state;
    case 'USERDATA_CREATION_SUCCESS':
      console.log('USERDATA_CREATION_SUCCESS');
      return { ...state, authError: null };
    case 'USERDATA_CREATION_FAILED':
      console.log('USERDATA_CREATION_FAILED');
      return { ...state, authError: action.err };
    default:
      return state;
  }
};

export default AuthReducer;
