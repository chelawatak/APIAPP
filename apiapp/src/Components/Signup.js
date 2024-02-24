import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  let navigate= useNavigate();
  const [users, setUser] = useState({name:"" ,email:"", password:""});
  const onChange = (e) => {
    setUser({...users, [e.target.name]: e.target.value })
  }

  const handleClick = async(e) =>{
    e.preventDefault();
    const response = await fetch("https://api-app/onrender.com/api/auth/newuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: users.name,
        email: users.email,
        password: users.password
      })
    });
    
    const json = await response.json();
    console.log(json);
    setUser(users);
    setUser({name:"", email: "", password:""});
    navigate("/login")
  }

  return (
    <>
    <h1 className='my-5'>Signup</h1>
    <div className='container signupcss'>
      <form>

      <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">Name</label>
            <input  onChange={onChange}  value={users.name} name='name' placeholder='Enter your name' type="text" className="form-control" id="exampleInputEmail"/>
        </div>

        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input  onChange={onChange}  value={users.email} name='email' placeholder='Enter your email address' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input  onChange={onChange}  value={users.password} name='password' placeholder='Enter your password' type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-dark" onClick={handleClick}>Submit</button>
    </form>
    </div>
    </>
  )
}

export default Signup
