import React, { useState } from "react";
import ReactQuill from "react-quill"; //import the react-quill library
import "react-quill/dist/quill.snow.css"; //import the css for react-quill
import { useDispatch } from "react-redux"; // import the useDispatch hook from react-redux
import { useLocation, useNavigate } from "react-router-dom"; // import the useNavigate hook from react-router-dom
import { addNote, editNote } from "../redux/notesSlice"; // import the addNote action from the notesSlice

const Note = () => {
  const location = useLocation(); //use the useLocation hook to get props
  const navigate = useNavigate(); //use the useNavigate hook to navigate back to the previous page
  const dispatch = useDispatch(); // use the useDispatch hook to dispatch the addNote action
  const item = location.state?.item ?? null;//check if item exist
  const [newNote] = useState(!item ? true : false);// check if it's a new Note
  const [content, setContent] = useState(item ? item.content : ""); // initialize the state for the text entered in the editor
  const [title, setTitle] = useState(item ? item.title : ""); //initialize the state for the title of the note

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
    if (newNote) {
      dispatch(addNote({ title, content }));
    }else{
      dispatch(editNote({id:item.id,title,content}))
    }
    setTitle("");
    setContent("");
    navigate("/"); // navigate back to the home page
  };

  return (
    <div>
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
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={Note.modules}
        formats={Note.formats}
      />
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

Note.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

Note.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default Note;
