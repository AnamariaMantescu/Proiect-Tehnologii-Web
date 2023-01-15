import React from "react";
import { FaShareAlt } from "react-icons/fa";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import deleteNoteService from "../service/deleteNoteService";

const NoteCard = ({ item, userId, setCount,setShowModal }) => {
  const navigate = useNavigate();
  const handleClick = (item) => {
    navigate("/note", { state: { userId: userId, item: item } });
  };
  // Function to handle deleting a note
  const handleDelete = (id) => {
    deleteNoteService(id, setCount);
  };
  return (
    <div
      className="card mb-4 col-md-4"
      key={item.id}
      style={{ height: "180px", border: '0px' }}
    >
      <div style={{border: '1px solid rgba(0,0,0,0.125)', borderRadius: '5px'}} className="shadow">
      <h6 className="card-header bg-transparent ">
        {item.title} <FaShareAlt className="float-right" onClick={()=>setShowModal(value=>!value)} />
        <span className="float-right font-weight-bold text-success mx-1">
          {item.matterName}
        </span>
      </h6>
      <div className="card-body ">
        <div>{parse(item.description)}</div>
      </div>
      <div className="card-footer bg-transparent">
        <button
          type="button"
          className="btn btn-info btn-sm mr-3"
          onClick={() => handleClick(item)}
        >
          Editeza
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => handleDelete(item.id)}
        >
          sterge
        </button>
      </div>
      </div>
    </div>
  );
};

export default NoteCard;
