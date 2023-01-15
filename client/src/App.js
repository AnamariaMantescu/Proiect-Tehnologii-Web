import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Importing the Sidebar component
import Sidebar from "./components/Sidebar";

// Importing the pages to be rendered based on the path
import Home from "./pages/Home";
import Login from "./pages/Login";
import Note from "./pages/Note";

const App = () => {
  return (
    // BrowserRouter is the top-level component for a React Router application.
    <BrowserRouter>
      {/* The Routes component renders the correct component based on the current URL path */}
      <Routes>
        {/* The exact path '/' renders the Login component */}
        <Route exact path="/" element={<Login />} />
      </Routes>

      {/* Wrapping the routes inside the Sidebar component */}
      <Sidebar>
        <Routes>
          {/* '/home' path renders the Home component */}
          <Route path="/home" element={<Home />} />

          {/* '/note' path renders the Note component */}
          <Route path="/note" exact element={<Note />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
