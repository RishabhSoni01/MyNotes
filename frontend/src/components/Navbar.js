import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
function Navbar(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const context = useContext(NoteContext);
  const { userName } = context;

  const handleLogout = () => {
    Cookies.remove("authtoken");
    navigate("/login");
    props.showAlert("Logged out successfully", "success");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
             style={{ backgroundColor: "#e3f2fd", opacity: "70%" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            NOTEBOOK
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/notes"
                  className={`nav-link ${
                    location.pathname === "/notes" ? "active" : ""
                  }`}
                  aria-current="page"
                >
                  {" "}
                  Your Notes
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                >
                  AddNote{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                >
                  About{" "}
                </Link>
              </li>
            </ul>
            {!Cookies.get("authtoken") ? (
              <form className="d-flex">
                <Link
                  to="/login"
                  className={`nav-link ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                >
                  Login{" "}
                </Link>
                <Link
                  to="/signup"
                  className={`nav-link ${
                    location.pathname === "/signup" ? "active" : ""
                  }`}
                >
                  {" "}
                  SignUp{" "}
                </Link>
              </form>
            ) : (
              <form className="d-flex">
                <p className="m-2 text-success">Welcome {userName}</p>
                <Link
                  to="/login"
                  onClick={handleLogout}
                  className={`nav-link ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                >
                  {" "}
                  Logout{" "}
                </Link>
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
