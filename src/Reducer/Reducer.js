const initState = {
  Token: null,
  ListRender: false,
};

export const Reducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        Token: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        Token: null,
      };
    case "isLISTRENDER":
      return {
        ...state,
        ListRender: action.payload,
      };
    
    default:
      return state;
  }
};
