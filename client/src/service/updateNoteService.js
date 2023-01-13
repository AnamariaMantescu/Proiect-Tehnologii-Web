import { apiUrl } from "./config";

async function updateNoteService(note) {
    try {
      const response = await fetch(apiUrl+'api/notes/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
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
  }
  
  export default updateNoteService