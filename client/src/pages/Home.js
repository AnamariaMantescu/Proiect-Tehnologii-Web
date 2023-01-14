import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import matterService from "../service/matterService";
import getNotesService from "../service/getNotesService";
import MattersList from "../components/MattersList";

import NoteCard from "../components/NoteCard";

const Home = () => {
  //Use the useNavigate hook to navigate & send props
  const navigate = useNavigate();

  const location = useLocation(); //use the useLocation hook to get props

  // Use the useSelector hook to get the notes from the Redux store
  // Use the useDispatch hook to dispatch the deleteNote action
  const userId = location.state?.userId;
  const login = location.state?.login

  const createNote = () => {
    navigate("/note", { state: { userId: userId } });
  };

  const [sortBy, setSortBy] = useState("imp");
  const [materie, setMaterie] = useState("toate");
  const [searchTerm, setSearchTerm] = useState("");
  const [allMatters, setAllMatters] = useState([]);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const searchNotes = (searchTerm) => {
    return data.filter(
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

  const getMatter = async () => {
    const matter = await matterService();
    const newMatter = [{ id: 0, title: "toate" }, ...matter];
    setAllMatters(newMatter);
  };
  const getNotes = async () => {
    const notes = await getNotesService(userId);
    setData(notes);
  };
  useEffect(() => {
    getMatter();
    getNotes();

    if (!login) {
      navigate("/");
    }
  }, [count]);

  return (
    <div className="App" key={count}>
      <h1 className="text-center">React Notes App</h1>
      <div className="container">
        {/* Link to add a new note */}

        <div className="d-flex">
          <button
            type="button"
            className="btn btn-primary mx-auto"
            onClick={createNote}
          >
            Add New Note
          </button>
        </div>
        {1 > 0 ? (
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
                <MattersList
                  materie={materie}
                  setMaterie={setMaterie}
                  allMatters={allMatters}
                />
              </div>
              <div className="col-sm ">
                <h4>Cautare</h4>
                <input
                  type="text"
                  placeholder="cautare"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-1"
                  style={{ width: "70%" }}
                />
              </div>
            </div>
            {/* Loop through the notes and render them */}
            <div className="row">
              {sortNotes.map((item, id) => {
                return (
                  <NoteCard item={item} userId={userId} setCount={setCount} key={id} />
                );
              })}
            </div>
          </div>
        ) : (
          <h2 className="text-center">Nu exista totite salvate</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
