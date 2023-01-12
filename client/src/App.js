import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Note from './pages/Note'

const App = () => {
  return (
    <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/note" exact element={<Note/>} />
  </Routes>
  )
}

export default App