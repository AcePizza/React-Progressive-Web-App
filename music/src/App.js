import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import {
  LoginStoreContext,
  LoginStoreContextProvider,
} from "./components/context/loginContext";
import MainNavbar from "./components/MainNavbar";
import GetData from "./GetData";
import ArtistDetails from "./views/ArtistDetails";
import LoginScreen from "./views/LoginScreen";
import NothingMuch from "./views/NothingMuch";

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
          <Route path="details/:artistName" element={<ArtistDetails />} />
          <Route path="*" element={<NothingMuch />} />
          <Route path="LoginScreen" element={<LoginScreen />} />
        </Routes>
      </LoginStoreContextProvider>
    </div>
  );
}

export default App;
