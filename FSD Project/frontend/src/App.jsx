import "./css/App.css";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register"; // if you have separate register page
import { Routes, Route, Navigate } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <MovieProvider>
      <NavBar token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={token ? <Navigate to="/profile" /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to="/profile" /> : <Register />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/favorites" element={<Favorites/>} />
      </Routes>
    </MovieProvider>
  );
}

export default App;
