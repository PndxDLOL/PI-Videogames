import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import VideogameDetail from "./Components/Detail/Detail";
import VideogamePost from "./Components/VideogamePost/VideogamePost";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/videogames/:id" element={<VideogameDetail />} />
          <Route path="/videogame" element={<VideogamePost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
