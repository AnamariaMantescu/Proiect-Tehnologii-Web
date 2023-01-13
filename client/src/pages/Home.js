import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { deleteNote } from "../redux/notesSlice";

const Home = () => {
  //Use the useNavigate hook to navigate & send props
  const navigate = useNavigate();

  const location = useLocation(); //use the useLocation hook to get props

  // Use the useSelector hook to get the notes from the Redux store
  const notes = useSelector((state) => state.notes);
  // Use the useDispatch hook to dispatch the deleteNote action
  const dispatch = useDispatch();
  console.log("notes", notes);
  const { login } = location.state;
  // Function to handle deleting a note
  const handleDelete = (id) => {
    // Dispatch the deleteNote action with the ID of the note to delete
    dispatch(deleteNote({ id }));
  };
  const handleClick = (item) => {
    navigate("/note", { state: { item: item } });
  };

  const [sortBy, setSortBy] = useState("imp");
  const [materie, setMaterie] = useState("toate");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  const handleSortMaterie = (e) => {
    setMaterie(e.target.value);
  };

  const searchNotes = (searchTerm) => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.materie.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const searchReturn = searchNotes(searchTerm);

  const filterNotes = searchReturn.filter((note) => {
    if (materie === "toate") {
      return materie;
    }
    return note.materie === materie;
  });

  const sortNotes = [...filterNotes].sort((a, b) => {
    if (sortBy === "asc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortBy === "imp") {
      return 0;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const materieTypes = [
    "toate",
    ...new Set(
      notes
        .filter((note) => note.materie.length > 0)
        .map((note) => note.materie)
    ),
  ];

  useEffect(() => {
    console.log("login", login);
    if (!login) {
      navigate("/");
    }
  }, [login, navigate]);

  return (
    console.log('sortNotes',sortNotes.length),
    <div className="App">
      <h1 className="text-center">React Notes App</h1>
      <div className="container">
        {/* Link to add a new note */}

        <div class="d-flex">
          <button type="button" className="btn btn-primary mx-auto" onClick={()=>navigate('/note')}>
            Add New Note
          </button>
        </div>
{sortNotes.length>0?
    <div>
        <h2>Sorteaza dupa </h2>
        <div className=" row my-3">
          <div className="col-sm">
            <h4>Data</h4>
            <select
              className="form-control"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="imp">Implicit</option>
              <option value="asc">First Created </option>
              <option value="desc">Last Created</option>
            </select>
          </div>
          <div className="col-sm">
            <h4>Materie</h4>
            <select
              className="form-control"
              value={materie}
              onChange={handleSortMaterie}
            >
              {materieTypes.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm">
            <h4>Cautare</h4>
            <input
              type="text"
              placeholder="cautare"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-1"
            />
          </div>
        </div>
        {/* Loop through the notes and render them */}
        {sortNotes.map((item, id) => {
          return (
            <div className="card mb-2" key={item.id}>
              <div className="card-body">
                <h5>{item.title}</h5>
                <div>{parse(item.content)}</div>
                <h6 className="float-right font-weight-bold text-success">
                  {item.materie}
                </h6>
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
        })}
      </div>:<h2 className="text-center">Nu exista totite salvate</h2>}
      </div> 
    </div>
  );
};

export default Home;
