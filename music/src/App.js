import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainNavbar from "./components/MainNavbar";
import GetData from "./GetData";
import ArtistDetails from "./views/ArtistDetails";
import LoginScreen from "./views/LoginScreen";
import NothingMuch from "./views/NothingMuch";

function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Routes>
        <Route path="/" element={<GetData />} />
        <Route path="details/:artistName" element={<ArtistDetails />} />
        <Route path="*" element={<NothingMuch />} />
        <Route path="LoginScreen" element={<LoginScreen />} />
      </Routes>
    </div>
  );
}

export default App;
