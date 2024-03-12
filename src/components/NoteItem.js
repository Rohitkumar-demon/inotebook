import React from 'react'
import noteContext from '../context/notes/noteContext';
import {useContext} from 'react'


const NoteItem = (props) => {
const context = useContext(noteContext);
const {deleteNote} = context;

const {note, updateNote} = props;


const truncateTag = (tag, limit) => {
  return tag.length > limit ? tag.substring(0, limit) + ".." : tag;
};


  return (
    <div className='col-md-3'>
      <div className="card my-3" >
     
  <div className="card-body">
    <div className="d-flex align-items-center flex-wrap-wrap ">
      
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
    props.showAlert("Note deleted successfully", "success")}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
    </div>
    
    <p className="mb-2 card-text">{note.description}</p>
    
    
  </div>

  <div className='position-absolute'
          style={{
            // display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "100",
            bottom: "0",
          }}
        >
          <span className=" badge rounded bg-dark">{truncateTag(note.tag, 5)}</span>
        </div>
</div>


    </div>
  )
}

export default NoteItem
