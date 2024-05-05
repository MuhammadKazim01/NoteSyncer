import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const [note, setNote] = useState({ title: "", tag: "", description: "" });
  const context = useContext(noteContext);
  const { addNote } = context;

  function onClick() {
    addNote(note.title, note.tag, note.description);
    setNote({ title: "", tag: "", description: "" });
  }
  function onChange(e) {
    e.preventDefault();
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <div className="mb-3 mt-4">
        <h3 className="display-6">Add Note</h3>
      </div>
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            placeholder="Note Title (Must have 3 character)"
            minLength={3}
            required
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="col">
          <input
            type="text"
            id="tag"
            name="tag"
            className="form-control"
            placeholder="Note Tag (Must have 3 character)"
            minLength={3}
            required
            value={note.tag}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          id="description"
          name="description"
          placeholder="Note Description (Must have 3 character)"
          rows="3"
          minLength={3}
          required
          value={note.description}
          onChange={onChange}
        ></textarea>
      </div>
      <div className="mb-5">
        <button
          disabled={note.title.length < 3 || note.description.length < 3}
          className="btn btn-primary"
          name="submit"
          onClick={onClick}
        >
          Add
        </button>
      </div>
    </div>
  );
}
export default AddNote