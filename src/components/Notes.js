/* eslint-disable no-unused-vars */
import React, { useEffect, useRef} from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { notes, getNotes , editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
    getNotes();
    }
    else {
      props.showAlert("You are not logged in. Please login to continue", "danger");
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const refClose = useRef(null)

  const [note, setNote] = useState({ id: "" ,etitle: "", edescription: "", etag: "default"})

  const [showModal, setShowModal] = useState(false);

  const updateNote = (currentnote) => {
    setShowModal(true);
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  
  };
  
  const closeModal = () => {
    setShowModal(false);
  };



  const handleClick = (e) => {
    e.preventDefault();
  
    // // Check if the title is empty or less than 3 characters
    // if (note.etitle.trim().length < 3) {
    //   alert("Title should have at least 3 characters. Please enter a valid title for the note.");
    // } else if (note.edescription.trim().length < 5) {
    //   alert('Description should have at least 5 characters. Please enter a valid description for the note.');
    // } else {
    editNote (note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note updated successfully", "success");
   
  
  }


const onChange = (e) => {
    setNote ({...note, [e.target.name]: e.target.value})
    
}

    
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>

        <button onClick={closeModal} type="button" data-dismiss="modal" className="btn-close" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3">
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" value={note.etitle} name = "etitle" id="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" value={note.edescription} name="edescription" id="edescription" onChange={onChange} minLength={5} required /  >
  </div>
 
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" value={note.etag} name="etag" id="etag" onChange={onChange}  / >
  </div>
      </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} onClick={closeModal} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<3 || note.edescription.length<5}  onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>


      <div className="row my-3">
        <h2>Your Note</h2>
        <div className="container mx-2"> 
        {notes.length === 0 && "No notes to display"}</div> 
        {notes.map((note, index) => {
          return <NoteItem key={index} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
