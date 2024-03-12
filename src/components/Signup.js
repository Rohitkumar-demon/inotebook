import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = (props) => {


  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});

  let navigate = useNavigate(); 


  const handleSubmit = async(e) => {
    
    e.preventDefault();
   const {name, email, password} = credentials;

    if(credentials.email === "" || credentials.password === "" || credentials.name === "") {
      // alert("Please fill all the fields");
      props.showAlert("Please fill all the fields", "danger");
      return;
    }
    if(credentials.password !== credentials.cpassword){
      // alert("Passwords do not match");
      props.showAlert("Passwords do not match", "danger");
      return;
    }


    const response = await fetch('http://localhost:5000/api/auth/createuser', {
 
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({name, email, password}),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
            props.showAlert("Account created successfully", "success");
        }
        else{
          if(json.error=== "Sorry a user with this email already exists") {
            props.showAlert("User already exists", "danger");
        } else {
            props.showAlert("Invalid details", "danger");
        }
        } 
}


const onChange = (e) => {
  setCredentials({...credentials, [e.target.name]: e.target.value})
}


  return (
    <div className='container mt-3'>
      <h2 className='my-3'>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="my-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Conform Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
