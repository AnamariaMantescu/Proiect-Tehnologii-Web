import React, { useState } from "react";
import ReactQuill from "react-quill"; //import the react-quill library
import "react-quill/dist/quill.snow.css"; //import the css for react-quill
import { useDispatch } from "react-redux"; // import the useDispatch hook from react-redux
import { useNavigate } from "react-router-dom"; // import the useNavigate hook from react-router-dom
import { addNote } from "../redux/notesSlice"; // import the addNote action from the notesSlice

const Note = () => {
  const navigate = useNavigate(); //use the useNavigate hook to navigate back to the previous page
  const dispatch = useDispatch(); // use the useDispatch hook to dispatch the addNote action
  const [content, setContent] = useState(); // initialize the state for the text entered in the editor
  const [title, setTitle] = useState(""); //initialize the state for the title of the note

  const handleChange = (value) => {
    setContent(value);
  };
  // this function is called every time the text in the editor changes
  // it updates the text state with the current value of the editor
  const handleSave = () => {
    // check if title or text is empty
    if (!title || !content) {
      alert("Titlul este obligatoriu");
      return;
    }
    // Dispatch addNote action with the new note data
    dispatch(addNote({ title, content }));
    setTitle("");
    setContent("");
    navigate("/"); // navigate back to the home page
  };

  return (
    <div >
      <h1>Notes</h1>
      <div className="d-flex justify-content-center flex-row mb-2">
        <input
          className="form-control"
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <ReactQuill value={content} onChange={handleChange} />
      <button
        type="button"
        className="btn btn-success mx-2 mt-2"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        type="button"
        className="btn btn-danger mt-2"
        onClick={() => navigate("/")}
      >
        Cancel
      </button>
    </div>
  );
};

export default Note;
