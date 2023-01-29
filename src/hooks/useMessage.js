import { useState } from "react";
import { useMessagesContext } from "./useMessagesContext";

export const useMessage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const sendMessage = async (_id, sender, recipient, title, body) => {
    setIsLoading(true);
    setError(null);

    const message = { _id, sender, recipient, title, body };

    const response = await fetch(`${process.env.REACT_APP_URI}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, error };
};
