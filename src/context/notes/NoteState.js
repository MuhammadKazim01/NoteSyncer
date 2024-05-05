import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Fetch all Notes
  const fetchAllNotes = async () => {
    try {
      const response = await fetch(`${host}api/notes/fetchall`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  //Add a Note
  const addNote = async (title, tag, description) => {
    try {
      const newNote = {
        user: "66314151af80a11d115e07cf",
        title: title,
        description: description,
        tag: tag,
        __v: 0,
      };

      const response = await fetch(`${host}api/notes/addnote`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      const responseData = await response.json();
      setNotes([...notes, responseData]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  //Delete a Note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem('token'),
        },
      });
      if (response.ok) {
        setNotes(notes.filter((note) => note._id !== id));
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  //Edit a Note
  const editNote = async (id, title, tag, description) => {
    try {
      const newNote = {
        title: title,
        description: description,
        tag: tag,
      };

      const response = await fetch(`${host}api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        setNotes(
          notes.map((note) =>
            note._id === id ? { ...note, title, tag, description } : note
          )
        );
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, fetchAllNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
