import { createSlice } from "@reduxjs/toolkit";

let nextNoteId = 0;

const notesSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    addNote: (state, action) => {
      state.push({
        id: nextNoteId++,
        title: action.payload.title,
        content: action.payload.content,
        materie: action.payload.materie,
        createdAt: action.payload.date,
      });
    },
    editNote: (state, action) => {
      const note = state.find((note) => note.id === action.payload.id);
      note.title = action.payload.title;
      note.content = action.payload.content;
      note.materie = action.payload.materie;
      note.createdAt = action.payload.date;
    },
    deleteNote: (state, action) => {
      state.splice(
        state.findIndex((note) => note.id === action.payload.id),
        1
      );
    },
  },
});

export const { addNote, editNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
