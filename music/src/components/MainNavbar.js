import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import discogsLogo from "../assets/discogs-white.png";
import { LoginStoreContext } from "./context/loginContext";
import "./MainNavbar.css";

function MainNavbar({ getSearchInput }) {
  const [input, setInput] = useState("");

  const { isUserLoggedIn } = useContext(LoginStoreContext);

  const onChangeSearchHandeler = (e) => {
    const value = e.target.value;
    // setInput(value.toUpperCase());
    setInput(value);
  };

  const disabledPathIfUserIsLoggedIn = () => {
    if (isUserLoggedIn) {
      return (
        <Nav.Link eventKey="link-1" href="/chatpage">
          Chat
        </Nav.Link>
      );
    } else {
      return (
        <Nav.Link eventKey="disabled" href="/LoginScreen">
          Chat login
        </Nav.Link>
      );
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/home">
            <img
              src={discogsLogo}
              style={{
                height: "25px",
                width: "100%",
              }}
            ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/LoginScreen">Login</Nav.Link>
              {disabledPathIfUserIsLoggedIn()}
            </Nav>
            {window.location.href === "http://localhost:3000/home" && (
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={input}
                  onChange={onChangeSearchHandeler}
                />
                <Button
                  variant="primary"
                  onClick={() => {
                    getSearchInput(input);
                  }}
                >
                  Search
                </Button>
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br></br>
    </>
  );
}

export default MainNavbar;
