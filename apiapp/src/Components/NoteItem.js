import React from 'react'
import useGenerateRandomColor from "./useGenerateRandomColor";
import { useState } from 'react';

const NoteItem = (props) => {

  const { note } = props;
  const { color, generateColor } =useGenerateRandomColor();

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const deleteNote = async(id) =>{
    const response = await fetch(`https://api-app/onrender.com/api/notes/deletenote/${id}`, {
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
    
    window.location.reload(false);
    
    
  }

  return (
    <div className="col-md-4">
      <div className=' mx-3 my-2 ' >
        
        <div className="card mx-3 my-3 cardcss" style={{width:"19rem", backgroundColor: "#" + color}}>
          <div className="card-body" >
            <div>
              <h4 style={{color:"Blue"}}>Title</h4>
            <h5 className="card-title">{props.note.title}</h5>
            </div>
           
           <div className='my-4'>
              <h4 style={{color:"blue"}}>Description</h4>
            <p className="card-text"> {props.note.description}</p>
           </div>
            <button onClick={() => {deleteNote(note._id);}} style={{width:"fit-content", borderRadius:"15px", marginTop:"10%",marginRight:"1%", color:"white", backgroundColor:"black"}}> Delete </button>
            <button onClick={generateColor} style={{width:"fit-content", borderRadius:"15px", marginTop:"10%", color:"white", backgroundColor:"black"}}> Change Color </button>
          </div>
        </div>
    </div>
    </div>
  )
}

export default NoteItem
