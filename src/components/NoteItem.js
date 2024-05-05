import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { deleteNote } = useContext(noteContext);
  const { title, description, tag, _id } = props.note;

  const handleDelete = () => {
    deleteNote(_id);
  };

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card position-relative">
        <span className="position-absolute top-0 end-0 badge bg-secondary">{tag}</span>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <i className="fa fa-trash mx-2" onClick={handleDelete}></i>
          <i className="fa fa-pencil-square mx-2" onClick={()=>{props.update(props.note)}}></i>
        </div>
      </div>
    </div>
  );
}
export default NoteItem;