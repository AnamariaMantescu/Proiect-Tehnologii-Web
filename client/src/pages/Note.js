import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill"; //import the react-quill library
import "react-quill/dist/quill.snow.css"; //import the css for react-quill
import { useLocation, useNavigate } from "react-router-dom"; // import the useNavigate hook from react-router-dom
import moment from "moment"; //import the moment for create & edit date
import createNoteService from "../service/createNoteService";
import matterService from "../service/matterService";
import updateNoteService from "../service/updateNoteService";
import MattersList from "../components/MattersList";

const Note = () => {
  const location = useLocation(); //use the useLocation hook to get props
  const navigate = useNavigate(); //use the useNavigate hook to navigate back to the previous page
  const item = location.state?.item ?? null; //check if item exist
  const userId = location.state.userId;
  const [newNote] = useState(!item ? true : false); // check if it's a new Note
  const [content, setContent] = useState(item ? item.description : ""); // initialize the state for the text entered in the editor
  const [title, setTitle] = useState(item ? item.title : ""); //initialize the state for the title of the note
  const [materie, setMaterie] = useState("Romana");
  const [matter, setMatter] = useState([]);
  const handleChange = (value) => {
    setContent(value);
  };
  // this function is called every time the text in the editor changes
  // it updates the text state with the current value of the editor

  const createNote = async () => {
   
    if (!title || !content) {
      alert("Titlul este obligatoriu");
      return;
    }
    let date = moment().format("YYYY-MM-DD hh:mm:ss");
    const newInputNote = {
      id:54,
      userId: userId,
      matterId:2,
      title: title,
      description: content,
      created: date,
      matterName: materie,
    };
    console.log('editnote',newNote)
    if(newNote){
      createNoteService(newInputNote);
    }
    else{
      console.log('else',newInputNote)
      updateNoteService(newInputNote)
    }
     
    alert("notita a fost creeata cu succes");
    navigate(-1);
  };

  const getMatter = async () => {
    const matter = await matterService();

    setMatter(matter);
  };
  useEffect(() => {
    getMatter();
  }, []);
  return (
    <div className="mx-3">
      <h1>Notes</h1>
      <div className="d-flex justify-content-center flex-row mb-2">
        <input
          className="form-control"
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <MattersList
          materie={materie}
          setMaterie={setMaterie}
          allMatters={matter}
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
        onClick={createNote}
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
    [
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      {
        color: [
          "#000000",
          "#e60000",
          "#ff9900",
          "#ffff00",
          "#008a00",
          "#0066cc",
          "#9933ff",
          "#ffffff",
          "#facccc",
          "#ffebcc",
          "#ffffcc",
          "#cce8cc",
          "#cce0f5",
          "#ebd6ff",
          "#bbbbbb",
          "#f06666",
          "#ffc266",
          "#ffff66",
          "#66b966",
          "#66a3e0",
          "#c285ff",
          "#888888",
          "#a10000",
          "#b26b00",
          "#b2b200",
          "#006100",
          "#0047b2",
          "#6b24b2",
          "#444444",
          "#5c0000",
          "#663d00",
          "#666600",
          "#003700",
          "#002966",
          "#3d1466",
          "custom-color",
        ],
      },
      {
        background: [
          "#000000",
          "#e60000",
          "#ff9900",
          "#ffff00",
          "#008a00",
          "#0066cc",
          "#9933ff",
          "#ffffff",
          "#facccc",
          "#ffebcc",
          "#ffffcc",
          "#cce8cc",
          "#cce0f5",
          "#ebd6ff",
          "#bbbbbb",
          "#f06666",
          "#ffc266",
          "#ffff66",
          "#66b966",
          "#66a3e0",
          "#c285ff",
          "#888888",
          "#a10000",
          "#b26b00",
          "#b2b200",
          "#006100",
          "#0047b2",
          "#6b24b2",
          "#444444",
          "#5c0000",
          "#663d00",
          "#666600",
          "#003700",
          "#002966",
          "#3d1466",
          "custom-color",
        ],
      },
    ],

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
  "color",
  "video",
  "background",
];

export default Note;
