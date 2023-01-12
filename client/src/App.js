import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Note from "./pages/Note";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/Home" element={<Home />} />
      <Route path="/note" exact element={<Note />} />
    </Routes>
  );
};

export default App;
