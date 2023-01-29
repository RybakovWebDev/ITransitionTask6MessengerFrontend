import { createContext, useReducer } from "react";

export const MessageContext = createContext();

export const usersReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGES":
      return {
        userMessages: action.payload,
      };
    case "POST_MESSAGE":
      return {
        userMessages: action.payload,
      };
    default:
      return state;
  }
};

export const MessageContextProvider = ({ children }) => {
  const [state, dispatchMsgs] = useReducer(usersReducer, {
    userMessages: null,
  });

  return <MessageContext.Provider value={{ ...state, dispatchMsgs }}>{children}</MessageContext.Provider>;
};
