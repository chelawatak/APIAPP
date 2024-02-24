import NoteContext from "./noteContext";
import { useState } from "react";
import React from "react";

const NoteState = (props) => {
  const host = "https://api-app-hgnw.onrender.com";
  // const host = 'localhost:3000';
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    setNotes(json);
  };





  // Add a Note
  const addNote = async (title, description) => {
    // TODO: API Call
    // API Call
    const response = await fetch(`${host}/api/notes/newnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description})
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };






  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    // eslint-disable-next-line
    const json = response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
