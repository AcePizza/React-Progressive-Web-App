import React, { useContext } from "react";
import Container from "react-bootstrap/esm/Container";
import ArtistDetails from "../views/ArtistDetails";
import { LoginStoreContext } from "./context/loginContext";

function ProtectedRoute(children) {
  const { isUserLoggedIn } = useContext(LoginStoreContext);
  console.log("Protected >>>", isUserLoggedIn);

  return (
    <Container>
      {isUserLoggedIn ? (
        <ArtistDetails />
      ) : (
        "Here you should redirect to the login page"
      )}
    </Container>
  );
}

export default ProtectedRoute;
