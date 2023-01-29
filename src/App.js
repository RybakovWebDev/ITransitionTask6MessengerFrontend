import "./App.css";
import { useEffect, useState } from "react";
import NewMessageFooter from "./components/NewMessageFooter";
import UserSelect from "./components/UserSelect";
import Messages from "./components/Messages";
import ComposeModal from "./components/ComposeModal";
import { useUsersContext } from "./hooks/useUsersContext";
import { useMessagesContext } from "./hooks/useMessagesContext";
import { io } from "socket.io-client";

class Message {
  constructor(_id, recipient, title, body) {
    this._id = _id;
    this.recipient = recipient;
    this.title = title;
    this.body = body;
  }
}

const socket = io(process.env.REACT_APP_URI);

function App() {
  const [currentUser, setCurrentUser] = useState();
  const { users, dispatchUsers } = useUsersContext();
  const { userMessages, dispatchMsgs } = useMessagesContext();
  const [modalVisibility, setModalVisibility] = useState(false);

  const requestMessages = () => {
    socket.on(`${currentUser}Messages`, (data) => {
      console.log("Received messages");
      console.log(data);
      dispatchMsgs({ type: "SET_MESSAGES", payload: data });
    });
  };

  const notifyRecipient = (recipient) => {
    socket.emit("notifyRecipient", recipient);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });

    if (currentUser) {
      socket.emit("getMessages", currentUser);
      console.log("Emitting to get messages");
    }

    requestMessages();

    return () => {
      socket.off("connect");
      socket.off("userMessages");
    };
  }, [currentUser, dispatchMsgs]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${process.env.REACT_APP_URI}/api/users`);
      const json = await response.json();
      if (response.ok) {
        dispatchUsers({ type: "SET_USERS", payload: json });
        console.log(json);
      }
    };
    fetchUsers();
  }, [dispatchUsers]);

  const modalHandler = () => {
    modalVisibility ? setModalVisibility(false) : setModalVisibility(true);
  };

  return (
    <section className='app-parent'>
      <header className='app-header-parent'>
        {users ? <UserSelect users={users} setCurrentUser={setCurrentUser} /> : ""}
      </header>
      <section className='app-body-parent'>
        <Messages messages={userMessages} modalVisibility={modalVisibility} />

        <ComposeModal
          currentUser={currentUser}
          modalVisibility={modalVisibility}
          modalHandler={modalHandler}
          notifyRecipient={notifyRecipient}
        />
      </section>
      <footer className='app-footer-parent'>
        {currentUser ? (
          <NewMessageFooter users={users} modalVisibility={modalVisibility} modalHandler={modalHandler} />
        ) : (
          ""
        )}
      </footer>
    </section>
  );
}

export default App;
