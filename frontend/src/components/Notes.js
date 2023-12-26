// what is use of useRef in this project?????????????????

import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import EditNote from "./EditNote";
import NoteItems from "./NoteItems";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Shimmer from "./Shimmer";
function Notes(props) {
  const context = useContext(NoteContext);
  const { notes, getNote, editNote } = context;

  const [enote, setenote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "default",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("authtoken")) {
      // Schedule the sayHello function to execute after 2000 milliseconds (2 seconds)
      // setTimeout(getNote(), 2000);
      getNote();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  //
  const ref = useRef(null);
  const refclose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setenote(currentNote);
  };

  const onchange = (e) => {
    setenote({ ...enote, [e.target.name]: e.target.value });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    editNote(enote._id, enote.title, enote.description, enote.tag);
    refclose.current.click();

    props.showAlert("Note is updated successfully", "success");
  };

  return notes.length === 0 ? (
    <>
      <div className="my-5">
        <div>
          <h3>🧾 Your Notes:</h3>
        </div>
      </div>
      <Shimmer />
    </>
  ) : (
    <>
      <div className="my-5">
        <div>
          <h3>🧾 Your Notes:</h3>
        </div>
      </div>

      <EditNote
        reference={ref}
        closeref={refclose}
        enote={enote}
        onchange={onchange}
        handleChange={handleEdit}
      />

      <div className="row mb-5">
        <div className="mx-3">
          {notes.length === 0 && "No notes to display.."}
        </div>
        {notes.map((note) => {
          return (
            <NoteItems
              key={note._id}
              note={note}
              updateNote={updateNote}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
