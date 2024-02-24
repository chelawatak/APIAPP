import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value })
    }


    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch("https://api-app/onrender.com/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          })
        });
    
        const json = await response.json();
        console.log(json);
        if (json.success) {
          alert("Logged In successfully", "success");
          localStorage.setItem("token", json.auth_token);
          console.log(json.auth_token);
          navigate("/create");
        } 
        else {
          alert("Invalid credentials", "danger");
        }
      };

    return (
    <>
    <h1 className='my-5'>Login</h1>
    <div className='container logincss'>
      <form>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input value={credentials.email} name="email" onChange={onChange} placeholder='Enter your email address' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input value={credentials.password} name="password" onChange={onChange} placeholder='Enter your password' type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" onClick={handleClick} className="btn btn-dark">Submit</button>
    </form>
    </div>
    </>
  )
}

export default Login






