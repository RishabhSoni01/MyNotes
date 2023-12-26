// we export this to wrap the all the component of project to provide data 
// data provider
import NoteContext from "./noteContext";
import React, { useState } from "react";
import Cookies from 'js-cookie';

const NoteState = (props) => {
  
  const notesInitial = [];

  const [notes, setnotes] = useState(notesInitial);
  const [userName, setName] = useState("");

  //fetch user Name
  const fetchData =  async() => {
    try {
      const response = await fetch("/api/auth/getuser/", {
        method: "POST",
        headers: {
          "auth-token": Cookies.get('authtoken'),
        },
      });
      const json = await response.json();
      // setName("json.name");
      setName(json.name);
      // console.log(json);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //get all notes
  const getNote = async () => {

    const response = await fetch("api/notes/fetchallnotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": Cookies.get('authtoken'),
      },
    });
    
    const json = await response.json();
    setnotes(json);
  };
  //

  //add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch("api/notes/addnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": Cookies.get('authtoken'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json(); // from here we get the note object
    // in note object we have ObjectId of added note and success message
    // why we need ObjectId of each node here is because we need to delete or edit a parrticular note

    // console.log(note);
    
    if(note.success){
    setnotes(notes.concat(note));
    }
  };

  //delete a note
  const deleteNote = async (id) => {
    //Api call to delete
    const response = await fetch(`api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": Cookies.get('authtoken'),
      },
    });

    const json = await response.json();
    // console.log(json);

    // Client side code
    const newnotes = notes.filter((note) => {
      return id !== note._id;
    });
    setnotes(newnotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": Cookies.get('authtoken'),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    // console.log(json);

    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      let element = newNote[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        // element.date = Date.now();
        break;
      }
    }
    setnotes(newNote);
  };

  return (
    <NoteContext.Provider  value={{ notes, getNote, addNote, deleteNote, editNote,fetchData,userName }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
