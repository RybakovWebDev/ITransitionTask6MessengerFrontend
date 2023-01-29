import { useState } from "react";
import { useMessagesContext } from "./useMessagesContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatchMsgs } = useMessagesContext();

  const login = async (_id, name) => {
    setIsLoading(true);
    setError(null);

    const user = { _id, name };

    const response = await fetch(`${process.env.REACT_APP_URI}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
    }

    const responseMsgs = await fetch(`${process.env.REACT_APP_URI}/api/messages/${name}`);
    const jsonMsgs = await responseMsgs.json();
    if (response.ok) {
      dispatchMsgs({ type: "SET_MESSAGES", payload: jsonMsgs });
    }
  };

  return { login, isLoading, error };
};
