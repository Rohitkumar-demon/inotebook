import React from 'react'
import {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import { useState } from "react";

//addNote is a function that is used to add a note to the list of notes. It takes in the title, description and tag of the note as parameters and adds the note to the list of notes. 
const AddNote = (props) => {

    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    //handleClick is a function that is used to handle the click event of the Add Note button. It takes in an event as a parameter and adds the note to the list of notes.
    const handleClick = (e) => {
        e.preventDefault();
      

        // if (note.title.trim().length < 3) {
        //   alert("Title should have at least 3 characters. Please enter a valid title for the note.");
        // } else if (note.description.trim().length < 5) {
        //   alert('Description should have at least 5 characters. Please enter a valid description for the note.');
        // } else {
          addNote(note.title, note.description, note.tag);
          setNote ({title: "", description: "", tag: ""})
          props.showAlert("Note added successfully", "success");
        // }
 
    }



    //onChange is a function that is used to change the value of the note object. It takes in an event as a parameter and changes the value of the note object based on the name of the input field and the value entered by the user.
    const onChange = (e) => {
        setNote ({...note, [e.target.name]: e.target.value})
    }

//The return statement contains the form to add a note. It contains input fields for the title, description and tag of the note. It also contains a button to add the note to the list of notes.

  return (
    <div>
            <div className="container my-3">
      <h2>Add a Note</h2>
     
      <form className="my-3">
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" name = "title" id="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={3} required/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" name="description" id="description" value={note.description} onChange={onChange} minLength={5} required / >
  </div>
 
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={onChange} / >
  </div>


  <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
</form>
</div>
    </div>
  )
}

export default AddNote
