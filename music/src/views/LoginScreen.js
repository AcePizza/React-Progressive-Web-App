import { async } from "@firebase/util";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { render } from "react-dom";
import { useNavigate } from "react-router-dom";
import { LoginStoreContext } from "../components/context/loginContext";
import LoadingPleaseWait from "../components/LoadingPleaseWait";

function LoginScreen() {
  // the context data (Test). The Value from this is not set globally
  const { isUserLoggedIn, setIsUserLoggedIn, logout, login } =
    useContext(LoginStoreContext);
  const redirectTo = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const loginEmailInputHandeler = (evt) => {
    setEmail(evt.target.value);
  };

  const loginPasswordInputHandeler = (evt) => {
    setPassword(evt.target.value);
  };

  const loginNewUserHandeler = () => {
    login(email, password);
  };

  const logOutUser = () => {
    logout();
  };

  const isSomeoneLoggedIn = () => {
    switch (isUserLoggedIn) {
      case false:
        return (
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
        );
      case true:
        return (
          <Button variant="danger" onClick={logOutUser}>
            Log out
          </Button>
        );
      case undefined:
        return <LoadingPleaseWait />;
    }
  };

  console.log(isUserLoggedIn);

  return <Container>{isSomeoneLoggedIn()}</Container>;
}

export default LoginScreen;
