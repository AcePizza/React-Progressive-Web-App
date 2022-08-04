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
    const messageArray = [];
    const querySnapshot = await getDocs(collection(db, "chat"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      messageArray.push(doc.data());
    });
    setMessages(messageArray);
  };

  const onChangeMessageHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const onClickMessageHandler = async () => {
    whoIsUser ? <LoadingPleaseWait /> : signedInUser();

    const docRef = await addDoc(collection(db, "chat"), {
      author: whoIsUser,
      text: newMessage,
      time: new Date(),
    });
  };

  useEffect(() => {
    checkMessagesFromDB();
  }, []);

  messages
    ? console.log(new Date(messages[0].time.seconds * 1000))
    : console.log("this is not true");

  return (
    <Container>
      <Row>
        {!messages ? (
          <LoadingPleaseWait />
        ) : (
          messages.map((message, index) => {
            return (
              <Col key={index}>
                <Toast>
                  <Toast.Header>
                    <strong className="me-auto">{message.author}</strong>
                    <small>somethings</small>
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
