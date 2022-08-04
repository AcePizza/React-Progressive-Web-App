import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Toast from "react-bootstrap/Toast";
import { db } from "../config/config";
import { collection, addDoc, getDocs, query, docRef } from "firebase/firestore";
import LoadingPleaseWait from "../components/LoadingPleaseWait";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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
    // Check to see if there is a use loggedin (Maybe this is not usefull)
    whoIsUser ? <LoadingPleaseWait /> : signedInUser();

    const docRef = await addDoc(collection(db, "chat"), {
      author: whoIsUser,
      text: newMessage,
      time: new Date(),
    });
  };

  // This handles the deletion of a message in the database
  const onCloseMessageHandeler = (messageid) => {
    console.log("this will close the message");
    console.log("The id from the emement", messageid);
  };

  useEffect(() => {
    checkMessagesFromDB();
  }, []);

  useEffect(() => {
    onCloseMessageHandeler();
  }, [onCloseMessageHandeler]);

  // messages
  //   ? console.log(new Date(messages[0].time.seconds * 1000))
  //   : console.log("this is not true");

  return (
    <Container>
      <Row>
        {!messages ? (
          <LoadingPleaseWait />
        ) : (
          messages.map((message, index) => {
            return (
              <Col key={index}>
                <Toast onClose={onCloseMessageHandeler(message.id)}>
                  <Toast.Header>
                    <strong className="me-auto">{message.author}</strong>
                    <small>{message.time}</small>
                  </Toast.Header>
                  <Toast.Body>{message.text}</Toast.Body>
                </Toast>
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
