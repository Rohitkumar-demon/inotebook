
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async (g) => {
    //  API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  /// Add a note
  const addNote = async (title, description, tag) => {
    try {
      //  API CALL
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      // API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const json = await response.json();

      // Logic to delete from client
      let newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      //api call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const json = await response.json();

      let newNotes = JSON.parse(JSON.stringify(notes));

      //logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];

        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
      getNotes();
    } catch (error) {
      console.error("Failed to edit note:", error);
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
