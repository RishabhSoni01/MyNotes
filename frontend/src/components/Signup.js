import React, { useContext,useState } from "react";
import NoteContext from "../context/notes/noteContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

function SignUp(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    name: "",
    password: "",
    cpassword: "",
  });
  
  const context = useContext(NoteContext);
  const { fetchData } = context;

  const [load, setLoad] = useState(false); // for loading spinner
  let navigate = useNavigate();
  const location = useLocation();
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

    // const { password, cpassword } = credentials;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { email, name, password } = credentials;
    //
    let pass = document.querySelector("#password").value; // getting password and confirm password
    let cpass = document.querySelector("#cpassword").value;
    if (pass === cpass) {
      setLoad(true);
      const response = await fetch("api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      });
      setLoad(false);
      const json = await response.json();
      // console.log(json);

      if (json.success) {
        // localStorage.setItem("token", json.authtoken); // storing token in local storage
        fetchData();
        navigate("/"); // redirect to home page
        props.showAlert(
          "Account created successfully , Now you can add Notes",
          "success"
        );
      } else {
        props.showAlert("Invalid Details! " + json.error, "danger");
      }
    } else {
      props.showAlert("Passwords didn't match! Try again.", "danger");
    }
  };

  return (
    <>
      <div className="text-center">
        <h1>NOTEBOOK</h1>
        <p>
          <b>Your notes on cloud ☁️</b>
        </p>
      </div>

      <form onSubmit={handleClick}>
        <div className="container my-5">
          <p className="text-center my-3">
            <i>New to Notebook? 👉🏻Create a new account here! </i>
          </p>
          <div className="mb-3 ">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              onChange={onchange}
              id="email"
              name="email"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="mb-3 ">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={onchange}
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3 ">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={onchange}
              id="password"
              name="password"
              minLength={5}
              placeholder="Password must be atleast of 5 characters"
              required
            />
          </div>
          <div className="mb-3 ">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={onchange}
              id="cpassword"
              name="cpassword"
              minLength={5}
              placeholder="Confirm Password"
              required
            />
          </div>
        </div>
        <div className="text-center">
          {!load ? (
            <button type="submit" className="btn btn-primary">
              SignUp
            </button>
          ) : (
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Please Wait ...
            </button>
          )}
        </div>
        <br />
        <p className="text-center last-para">
          Already have an account?{" "}
          <Link
            to="/login"
            className={`nav-link ${
              location.pathname === "/login" ? "active" : ""
            }`}
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
}

export default SignUp;
