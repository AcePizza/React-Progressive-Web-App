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
import ChatPage from "./views/ChatPage";
import LandingPage from "./views/LandingPage";
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
          <Route path="/" element={<LandingPage />} />
          <Route path="home" element={<GetData searchInput={searchInput} />} />
          <Route
            path="home/details/:artist"
            element={
              <ProtectedRoute>
                <ArtistDetails />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NothingMuch />} />
          <Route path="registeruser" element={<RegisterUser />} />
          <Route path="LoginScreen" element={<LoginScreen />} />
          <Route path="chatpage" element={<ChatPage />} />
        </Routes>
      </LoginStoreContextProvider>
    </div>
  );
}

export default App;
