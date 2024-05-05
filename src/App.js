import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NotesState from "./context/notes/NoteState";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <NotesState>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="signup" element={<Signup />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="about" element={<About />} />
        </Routes>
      </NotesState>
    </div>
  );
}

export default App;
