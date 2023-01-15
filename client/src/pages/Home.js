import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import matterService from "../service/matterService";
import getNotesService from "../service/getNotesService";
import MattersList from "../components/MattersList";
import { useSelector } from "react-redux";

import NoteCard from "../components/NoteCard";
import Modal from "../components/Modal";

const Home = () => {
  //Use the useNavigate hook to navigate & send props
  const navigate = useNavigate();

  const userId = useSelector((state) => state.userId.userId);
  // Use the useSelector hook to get the notes from the Redux store
  // Use the useDispatch hook to dispatch the deleteNote action
  // const userId = location.state?.userId;

  const createNote = () => {
    navigate("/note");
  };

  const [sortBy, setSortBy] = useState("imp");
  const [materie, setMaterie] = useState("toate");
  const [searchTerm, setSearchTerm] = useState("");
  const [allMatters, setAllMatters] = useState([]);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const searchNotes = (searchTerm) => {
    return data.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.matterName.toLowerCase().includes(searchTerm.toLowerCase())
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
      return new Date(a.created) - new Date(b.created);
    }
    if (sortBy === "imp") {
      return 0;
    } else {
      return new Date(b.created) - new Date(a.created);
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
    if (!userId) {
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div className="App" key={count}>
      <h4 className="text-center">React Notes App</h4>
      <div className="container">
        {/* Link to add a new note */}
        <div className="right">
          <button
            type="button"
            style={{ float: "right" }}
            className="btn btn-primary shadow"
            onClick={createNote}
          >
            Add New Note
          </button>
        </div>
        {data.length > 0 ? (
          <div>
            <h5>Sorteaza dupa </h5>
            <div className=" row my-3">
              <div className="col-sm">
                <h6>Data</h6>
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
                <h6>Materie</h6>
                <MattersList
                  matter={materie}
                  setMatter={setMaterie}
                  allMatters={allMatters}
                />
              </div>
              <div className="col-sm ">
                <h6>Cautare</h6>
                <input
                  type="text"
                  placeholder="cautare"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-1"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            {/* Loop through the notes and render them */}
            <div className="row">
              {sortNotes.map((item, id) => {
                return (
                  <React.Fragment key={id}>
                    {showModal && (
                      <Modal setShowModal={setShowModal} nota={item} />
                    )}
                    <NoteCard
                      item={item}
                      userId={userId}
                      setCount={setCount}
                      setShowModal={setShowModal}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ) : (
          <h5 className="text-center" style={{    position: 'absolute',
            top:' 50%',marginLeft:'52vh'}}>Nu exista notite salvate</h5>
        )}
      </div>
    </div>
  );
};

export default Home;
