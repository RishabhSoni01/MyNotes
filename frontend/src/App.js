import "./App.css";
import { useState } from "react";
import About from "./components/About";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import Navbar from "./components/Navbar";
// BrowserRouter as Router means that we are using the BrowserRouter component as Router.
// For example:  Switch as Rajat means that we use Switch as Rajat.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import SignUp from "./components/Signup";
import Login from "./components/Login";
import useOnline from "./Hooks/useOnline";


function App() {
  // console.log(window.navigator);

  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };

  const isOnline = useOnline();

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar showAlert={showAlert} />

          <Alert alert={alert} />
          {!isOnline ? (
            <App />
          ) : (
            <div className="container my-5">
              <Routes>
                <Route
                  path="/notes"
                  element={<Notes showAlert={showAlert} />}
                />
                <Route path="/" element={<AddNote showAlert={showAlert} />} />
                <Route
                  path="/about"
                  element={<About showAlert={showAlert} />}
                />
                <Route
                  path="/login"
                  element={<Login showAlert={showAlert} />}
                />
                <Route
                  path="/signup"
                  element={<SignUp showAlert={showAlert} />}
                />
              </Routes>
            </div>
          )}
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
