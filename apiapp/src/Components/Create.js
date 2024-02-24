import React, {  useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } 
    // eslint-disable-next-line
  }, []);
  const [notes, setNotes] = useState({title:"", description:""});

  const onChange = (e) => {
    setNotes({...notes, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    const response = await fetch("https://api-app-hgnw.onrender.com/api/notes/newnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        title: notes.title,
        description: notes.description
      })
    });

    const json = await response.json();
    console.log(json);
    setNotes(notes);
    setNotes({title: "", description:""});
  }

   

  

  return (
    <div className="container">
      <h1 className="my-5">Create Note</h1>
        <div className='container my-2 createcss' style={{width:"50%"}}>
        <form>
        <div className="mb-3">
          <label htmlFor="exampleInput1" className="form-label">Title</label>
          <input value={notes.title} name="title"  onChange={onChange} type="text" className="form-control" id="exampleInput1" placeholder='Enter title here'/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInput2" className="form-label">Description</label>
          <textarea value={notes.description} name="description" onChange={onChange} className="form-control" aria-label="With textarea" placeholder='Enter description here' style={{height:"100px"}}></textarea>
        </div>

        <button type="submit" className="btn btn-dark" onClick={handleSubmit} >Submit</button>
      </form>
    </div>

  </div>
  )
}

export default Create;
