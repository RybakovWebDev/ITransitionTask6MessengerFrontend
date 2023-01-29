import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useMessagesContext } from "../hooks/useMessagesContext";

const ComposeModal = (props) => {
  const { dispatchMsgs } = useMessagesContext();
  const [recipient, setRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const messageHandler = async (e) => {
    const _id = uuidv4();
    const sender = props.currentUser;
    console.log("Sending message");
    e.preventDefault();

    const message = { _id, sender, recipient, title, body };
    console.log(message);

    const response = await fetch(`${process.env.REACT_APP_URI}/api/messages`, {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log("Response for sending message not ok");
    }
    if (response.ok) {
      props.notifyRecipient(recipient);

      console.log("New message added", json);

      dispatchMsgs({ type: "CREATE_MESSAGE", payload: json });

      props.modalHandler();
      setRecipient("");
      setTitle("");
      setBody("");
    }

    const responseMsgs = await fetch(`${process.env.REACT_APP_URI}/api/messages/${sender}`);
    const jsonMsgs = await responseMsgs.json();
    if (responseMsgs.ok) {
      dispatchMsgs({ type: "SET_MESSAGES", payload: jsonMsgs });
      console.log(jsonMsgs);
    }
  };
  return (
    <Modal show={props.modalVisibility} onHide={props.modalHandler} size='lg' centered>
      <Modal.Header className='modal-dialog-header' closeButton></Modal.Header>

      <Modal.Body className='modal-dialog-body'>
        <Form.Control
          id='modal-user-selection'
          size='lg'
          type='text'
          placeholder='Enter recipient name'
          onChange={(e) => setRecipient(e.target.value)}
          value={recipient}
          maxLength='20'
        />
        <Form.Control
          id='modal-text-title'
          size='md'
          type='text'
          placeholder='Enter title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          maxLength='100'
        />
        <textarea
          name=''
          id='modal-text-body'
          placeholder='Enter message'
          onChange={(e) => setBody(e.target.value)}
          value={body}
        ></textarea>
      </Modal.Body>

      <Modal.Footer className='modal-dialog-footer'>
        <Button className='compose-message-btn' variant='btn btn-outline-dark' type='submit' onClick={messageHandler}>
          Send message
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComposeModal;
