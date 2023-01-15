import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill"; //import the react-quill library
import "react-quill/dist/quill.snow.css"; //import the css for react-quill
import { useLocation, useNavigate } from "react-router-dom"; // import the useNavigate hook from react-router-dom
import moment from "moment"; //import the moment for create & edit date
import createNoteService from "../service/createNoteService";
import matterService from "../service/matterService";
import MattersList from "../components/MattersList";
import updateNoteService from "../service/updateNoteService";import { useSelector } from "react-redux";

const Note = () => {
  const location = useLocation(); //use the useLocation hook to get props
  const navigate = useNavigate(); //use the useNavigate hook to navigate back to the previous page
  const item = location.state?.item ?? null; //check if item exist
  const userId = useSelector((state) => state.userId.userId);
  const [newNote] = useState(!item ? true : false); // check if it's a new Note
  const [content, setContent] = useState(item ? item.description : ""); // initialize the state for the text entered in the editor
  const [title, setTitle] = useState(item ? item.title : ""); //initialize the state for the title of the note
  const [matter, setMatter] = useState(item ? item.matterName : 'Romana');
  const [matters, setMatters] = useState([]);
  const [file, setFile] = useState("");
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    getMatter();
    if (!newNote) {
      getImages();
      getFiles();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("image", file);
    fetch("http://localhost:3001/upload/image/" + item.id, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json)
      .then((res) => {
        getImages();
      })
      .catch((error) => [console.error(error)]);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    fetch("http://localhost:3001/upload/file/" + item.id, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "multipart/form-data",
      },
      credentials: "include",
    })
      .then((res) => res.json)
      .then((res) => {
        getFiles();
      })
      .catch((error) => [console.error(error)]);
  };

  const getImages = async () => {
    fetch("http://localhost:3001/api/images/" + item.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json, charset=UTF-8",
        Accept: "application/json, text/html",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        setImages(data);
      });
  };

  const getFiles = async () => {
    fetch("http://localhost:3001/api/files/" + item.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json, charset=UTF-8",
        Accept: "application/json, text/html",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        setFiles(data);
      });
  };

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
    let matterITem = matters.find(x => x.title === matter);
    const newInputNote = {
      id: item ? item.id : null,
      userId: userId,
      matterId: matterITem.id,
      title: title,
      description: content,
      created: date,
      matterName: matterITem.title,
    };
    if (newNote) {
      createNoteService(newInputNote);
      alert("notita a fost creeata cu succes");
    } else {
      await updateNoteService(newInputNote);
    }

    navigate(-1);
  };

  const getMatter = async () => {
    const response = await matterService();

    setMatters(response);
  };

  const removeImage = (imageId) => {
    fetch("http://localhost:3001/api/images/" + imageId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json, charset=UTF-8",
        Accept: "application/json, text/html",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        getImages();
      });
  };

  const removeFile = (fileId) => {
    fetch("http://localhost:3001/api/files/" + fileId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json, charset=UTF-8",
        Accept: "application/json, text/html",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        getImages();
      });
  };

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
          matter={matter}
          setMatter={(val) => setMatter(val)}
          allMatters={matters}
        />
      </div>
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={Note.modules}
        formats={Note.formats}
      />
      {!newNote && (
        <div className="mt-3 mb-3">
          <h4>Images</h4>
          <input
            type="file"
            name="image"
            accept="image/*"
            multiple={false}
            onChange={saveFile}
          />
          <button onClick={uploadImage}>Upload</button>
          <div className="row mt-4">
            {images.length > 0 &&
              images.map((i) => {
                return (
                  <div className="col-2" ky={i.id}>
                    <span
                      style={{
                        fontSize: "15px",
                        position: "absolute",
                        right: "10px",
                        top: "-8px",
                        color: "white",
                        background: "red",
                        borderRadius: "50px",
                        padding: "5px 13px",
                        fontWeight: "bold",
                      }}
                      onClick={() => removeImage(i.id)}
                    >
                      x
                    </span>
                    <img
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      src={require("../assets/" + i.image)}
                      alt='img'
                    />
                  </div>
                );
              })}
          </div>
          <h4>Files</h4>
          <input
            type="file"
            name="image"
            accept="file/*"
            multiple={false}
            onChange={saveFile}
          />
          <button onClick={uploadFile}>Upload</button>
          <div className="row mt-4">
            {files.length > 0 &&
              files.map((i) => {
                return (
                  <div className="col-2" ky={i.id}>
                    <span
                      style={{
                        fontSize: "15px",
                        position: "absolute",
                        right: "10px",
                        top: "-8px",
                        color: "white",
                        background: "red",
                        borderRadius: "50px",
                        padding: "5px 13px",
                        fontWeight: "bold",
                      }}
                      onClick={() => removeFile(i.id)}
                    >
                      x
                    </span>
                    <div
                      style={{
                        width: "100%",
                        height: "50px",
                        border: "3px solid #8217a6",
                        borderRadius: "10px",
                        textAlign: "center",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#8217a6",
                          fontSize: "20px",
                          marginTop: "5px",
                          display: "block",
                          textTransform: "uppercase",
                        }}
                      >
                        {i.file.split(".").pop()}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

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
        onClick={() => navigate(-1)}
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
    ["link", "video"],
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
  "color",
  "video",
  "background",
];

export default Note;
