import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { LoginStoreContext } from "../components/context/loginContext";

function LoginScreen() {
  // the context data (Test). The Value from this is not set globally
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginStoreContext);
  const redirectTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(LoginStoreContext);

  const loginEmailInputHandeler = (e) => {
    setEmail(e.target.value);
  };

  const loginPasswordInputHandeler = (e) => {
    setPassword(e.target.value);
  };

  const loginNewUserHandeler = () => {
    login(email, password);
  };

  console.log("the values sent to google : ", email, password);

  return (
    <Container>
      {isUserLoggedIn ? (
        <Button variant="danger">Log out</Button>
      ) : (
        <Form>
          <h4>Please enter your login credentials</h4>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={loginEmailInputHandeler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={loginPasswordInputHandeler}
            />
          </Form.Group>
          <Button variant="primary" onClick={loginNewUserHandeler}>
            Login
          </Button>{" "}
          <Button
            variant="info"
            onClick={() => {
              redirectTo("/registeruser");
            }}
          >
            Create User
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default LoginScreen;
