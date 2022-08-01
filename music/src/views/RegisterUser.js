import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { LoginStoreContext } from "../components/context/loginContext";
import { auth } from "../config/config";

function RegisterUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useContext(LoginStoreContext);

  const onChangeEmailHandeler = (e) => {
    setEmail(e.target.value);
  };

  const onChangePasswordHandeler = (e) => {
    setPassword(e.target.value);
  };

  const registerNewUserHandeler = () => {
    register(email, password);
  };

  return (
    <Container>
      <h4>User registration</h4>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={onChangeEmailHandeler}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangePasswordHandeler}
          />
        </Form.Group>
        <Button variant="primary" onClick={registerNewUserHandeler}>
          Create user
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterUser;
