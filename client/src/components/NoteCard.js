import React from "react";
import { FaShareAlt } from "react-icons/fa";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import deleteNoteService from "../service/deleteNoteService";

const NoteCard = ({ item, userId, setCount }) => {
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
      className="card mb-4 col-md-5  mx-3"
      key={item.id}
      style={{ height: "40vh" }}
    >
      <h5 className="card-header bg-transparent ">
        {item.title} <FaShareAlt className="float-right" />
        <h6 className="float-right font-weight-bold text-success mx-1">
          {item.matterName}
        </h6>
      </h5>
      <div className="card-body ">
        <div>{parse(item.description)}</div>
      </div>
      <div className="card-footer bg-transparent">
        <button
          type="button"
          className="btn btn-info mx-3"
          onClick={() => handleClick(item)}
        >
          Editeza
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(item.id)}
        >
          sterge
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
