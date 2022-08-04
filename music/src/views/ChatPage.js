import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Toast from "react-bootstrap/Toast";
import { db } from "../config/config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  query,
  docRef,
  deleteDoc,
  connectFirestoreEmulator,
} from "firebase/firestore";
import LoadingPleaseWait from "../components/LoadingPleaseWait";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ToastContainer from "react-bootstrap/ToastContainer";
import { LoginStoreContext } from "../components/context/loginContext";
import { Col, Row } from "react-bootstrap";

function ChatPage() {
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const { signedInUser, whoIsUser } = useContext(LoginStoreContext);

  // Checkes the messages which are stored in the DB
  const checkMessagesFromDB = async () => {
    let messageArray = [];
    const querySnapshot = await getDocs(collection(db, "chat"));
    querySnapshot.forEach((doc) => {
      // splitting data and time into smaller parts
      const data = doc.data();
      const timestamp = new Date(data.time.seconds * 1000);

      // Constructing a new object for use later
      const arr = {
        id: doc.id,
        author: data.author,
        text: data.text,
        time: `${timestamp.getDate()}/${timestamp.getMonth()} ${timestamp.getHours()}:${timestamp.getMinutes()}`,
      };

      // Pushing the element into an object
      messageArray.push(arr);
    });
    // Setting the state variable to the constructed object
    setMessages(messageArray);
  };

  // The new message constructor
  const onChangeMessageHandler = (e) => {
    setNewMessage(e.target.value);
  };

  // adds a new message to the database
  const onClickMessageHandler = async () => {
    console.log("Clicky click");
    // Check to see if there is a use loggedin (Maybe this is not usefull)
    whoIsUser ? <LoadingPleaseWait /> : signedInUser();

    const docRef = await addDoc(collection(db, "chat"), {
      author: whoIsUser,
      text: newMessage,
      time: new Date(),
    });
  };

  // This handles the deletion of a message in the database
  const onCloseMessageHandeler = async (messageid) => {
    console.log("The id from the emement", messageid.target.id);
    await deleteDoc(doc(db, "chat", messageid.target.id));
  };

  useEffect(() => {
    checkMessagesFromDB();
  }, [onCloseMessageHandeler]);

  useEffect(() => {
    console.log("whoIsTheUser", whoIsUser);
  }, []);

  //

  return (
    <Container>
      <Row>
        {!messages ? (
          <LoadingPleaseWait />
        ) : (
          messages.map((message, index) => {
            return (
              <Col key={index}>
                {message.author === whoIsUser ? (
                  <Toast bg="info">
                    <Toast.Header closeButton={false}>
                      <strong className="me-auto">{message.author}</strong>
                      <small>{message.time}</small>
                    </Toast.Header>
                    <Toast.Body>
                      <Col>{message.text}</Col>
                      <Col>
                        <Button
                          id={message.id}
                          variant="primary"
                          size="sm"
                          onClick={onCloseMessageHandeler}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Toast.Body>
                  </Toast>
                ) : (
                  <Toast>
                    <Toast.Header closeButton={false}>
                      <strong className="me-auto">{message.author}</strong>
                      <small>{message.time}</small>
                    </Toast.Header>
                    <Toast.Body>
                      <Col>{message.text}</Col>
                      <Col>
                        <Button
                          id={message.id}
                          variant="primary"
                          size="sm"
                          onClick={onCloseMessageHandeler}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Toast.Body>
                  </Toast>
                )}
                <br></br>
              </Col>
            );
          })
        )}
      </Row>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            placeholder="Write a message..."
            value={newMessage}
            onChange={onChangeMessageHandler}
          />
        </Form.Group>
        <Button variant="primary" onClick={onClickMessageHandler}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ChatPage;
