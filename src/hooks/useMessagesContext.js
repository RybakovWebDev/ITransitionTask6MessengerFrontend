import { MessageContext } from "../context/MessageContext";
import { useContext } from "react";

export const useMessagesContext = () => {
  const context = useContext(MessageContext);

  if (!context) {
    throw Error("useMessagesContext must be used inside an MessagesContextProvider");
  }

  return context;
};
