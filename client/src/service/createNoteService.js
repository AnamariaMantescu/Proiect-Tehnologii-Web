import { apiUrl } from "./config";

const createNoteService = async (newNote) => {
  try {
    const response = await fetch(apiUrl + "api/notes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
    } else {
      console.log(data.err);
    }
  } catch (error) {
    console.log(error);
  }
};

export default createNoteService;
