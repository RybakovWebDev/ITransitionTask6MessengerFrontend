import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UsersContextProvider } from "./context/UserContext";
import { MessageContextProvider } from "./context/MessageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UsersContextProvider>
      <MessageContextProvider>
        <App />
      </MessageContextProvider>
    </UsersContextProvider>
  </React.StrictMode>
);
