import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  LoginStoreContext,
  LoginStoreContextProvider,
} from "./components/context/loginContext";
import MainNavbar from "./components/MainNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { app } from "./config/config";
import GetData from "./GetData";
import ArtistDetails from "./views/ArtistDetails";
import LoginScreen from "./views/LoginScreen";
import NothingMuch from "./views/NothingMuch";
import RegisterUser from "./views/RegisterUser";

function App() {
  const [searchInput, setSearchInput] = useState();

  const getSearchInput = (input) => {
    setSearchInput(input);
    console.log(input);
  };

  return (
    <div className="App">
      <LoginStoreContextProvider>
        <MainNavbar getSearchInput={getSearchInput} />
        <Routes>
          <Route path="/" element={<GetData searchInput={searchInput} />} />
          <Route
            path="details/:artist"
            element={
              <ProtectedRoute>
                <ArtistDetails />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NothingMuch />} />
          <Route path="registeruser" element={<RegisterUser />} />
          <Route path="LoginScreen" element={<LoginScreen />} />
        </Routes>
      </LoginStoreContextProvider>
    </div>
  );
}

export default App;
