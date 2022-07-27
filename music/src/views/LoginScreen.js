import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { LoginStoreContext } from "../components/context/loginContext";

function LoginScreen() {
  // the context data (Test). The Value from this is not set globally
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginStoreContext);
  const redirectTo = useNavigate();

  return (
    <Container>
      {isUserLoggedIn ? (
        <Button
          variant="danger"
          onClick={() => {
            setIsUserLoggedIn(false);
          }}
        >
          Log out
        </Button>
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button
            onClick={() => {
              setIsUserLoggedIn(true);
              redirectTo("/");
            }}
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default LoginScreen;
