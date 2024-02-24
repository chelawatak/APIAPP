import React from 'react'
import { useState } from 'react';
import NoteItem from './NoteItem';

const Read = () => {
  
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const handleClick = async(e) =>{
    const response = await fetch("https://api-app/onrender.com/api/notes/fetchnote", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    // eslint-disable-next-line
    const json = await response.json();
    setNotes(json);
    console.log(json);
  }
 

  return (
    <div>
    <button className="logincss my-4 getNote" style={{width:"fit-content", color:"white", backgroundColor:"black"}} onClick={handleClick}>Click here to get notes</button>

        <div className="row md-4 ">
          <div className="container row">
              {notes.map((note) => {
              return (
                <NoteItem key={note._id} note={note} />
              );
              })}
          </div>
        </div>
    </div>
  )
}

export default Read
