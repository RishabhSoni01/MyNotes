import React, { useContext, useState, useEffect } from "react";

import NoteContext from "../context/notes/noteContext";

import { useNavigate, Link, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
function AddNote(props) {
  const location = useLocation();

  const context = useContext(NoteContext); 
  const { addNote, getNote } = context;

  const [note, setnote] = useState({ title: "", description: "", tag: "Todo" });

  const navigate = useNavigate();

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault(); //to prevent page from reloading
    if (note.title.length < 3 && note.description.length < 5) {
      props.showAlert( "Add minimum 3 Character in title and 5 in description", "warning" );
    } else if (note.title.length < 3) {
      props.showAlert("Add minimum 3 Character in Title", "warning");
    } else if (note.description.length < 5) {
      props.showAlert("Add minimum 5 Character in Description", "warning");
    } else {
      addNote(note.title, note.description, note.tag);
      setnote({ title: "", description: "", tag: "" });
      props.showAlert("Note added successfully", "success");
    }
  };
  // use of
  useEffect(() => {
    //if user is not logged in then redirect to login page
    // console.log("ok", Cookies.get('authtoken'));
    if (Cookies.get('authtoken')!= undefined) {
      // console.log("I am from addnote component", Cookies.get('authtoken'));
      // getNote();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="my-4">
        <div className="text-center">
          <h3>✍🏻 Add A New Note:</h3>
        </div>
        <div className="mb-3 my-4">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="tag"
            value={note.tag}
            onChange={onchange}
            name="tag"
          >
            <option value="Todo">Todo</option>
            <option value="Important">Important</option>
            <option value="Academic">Academic</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="mb-3 ">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={note.title}
            onChange={onchange}
            name="title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onchange}
            rows="3"
          ></textarea>
        </div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/notes"
          className={`nav-link ${
            location.pathname === "/notes" ? "active" : ""
          }`}
          aria-current="page"
        >
          Your Notes
        </Link>
      </div>
    </div>
  );
}

export default AddNote;
