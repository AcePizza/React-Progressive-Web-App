import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import ArtistDetails from "../views/ArtistDetails";
import { LoginStoreContext } from "./context/loginContext";

function ProtectedRoute(children) {
  const { isUserLoggedIn, signedInUser } = useContext(LoginStoreContext);
  console.log("What is the value of user", isUserLoggedIn);

  signedInUser();

  return (
    <Container>
      {isUserLoggedIn ? <ArtistDetails /> : <h4>Please login</h4>}
      {!isUserLoggedIn && (
        <a href="/LoginScreen">Click to be redirected to the login page...</a>
      )}
    </Container>
  );
}

export default ProtectedRoute;
