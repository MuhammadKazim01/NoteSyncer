import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem"
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, fetchAllNotes, editNote } = context;
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    etag: "",
    edescription: "",
  });

  const navigate = useNavigate();

  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchAllNotes();
    }else{
      navigate("/login");
    }
  }, [fetchAllNotes, navigate]);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      etag: currentNote.tag,
      edescription: currentNote.description,
    });
  };

  const onChange = (e) => {
    e.preventDefault();
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.etag, note.edescription);
    refClose.current.click();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
        ref={ref}
      ></button>

      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    id="etitle"
                    name="etitle"
                    className="form-control"
                    value={note.etitle}
                    minLength={3}
                    required
                    onChange={onChange}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    id="etag"
                    name="etag"
                    className="form-control"
                    placeholder="Note Tag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  placeholder="Note Description"
                  rows="7"
                  value={note.edescription}
                  minLength={3}
                  required
                  onChange={onChange}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={note.etitle.length < 3 || note.edescription.length < 3}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-center display-6 mb-4">My Notes</h3>
      </div>
      <div className="row">
        {notes.length === 0 ? (
          <p className="text-center">Notebook is empty</p>
        ) : (
          notes.map((note) => (
            <NoteItem key={note._id} note={note} update={updateNote} />
          ))
        )}
      </div>
    </>
  );
};

export default Notes;