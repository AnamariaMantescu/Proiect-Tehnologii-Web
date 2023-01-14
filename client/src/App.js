import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Note from "./pages/Note";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <Sidebar>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/note" exact element={<Note />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
