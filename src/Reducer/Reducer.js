const initState = {
  Token: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        Token: action.payload,
      };
    case "LOGOUT":
      return {
        Token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
