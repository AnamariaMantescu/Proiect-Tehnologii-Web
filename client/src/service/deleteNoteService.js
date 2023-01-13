import { apiUrl } from "./config";
const deleteNoteService=async(id,setCount)=>{
    try {
        const response = await fetch(apiUrl + `api/notes/delete/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data.message);
          setCount(value=>value+1)
        } else {
          console.log(data.err);
        }
      } catch (error) {
        console.log(error);
      }
}

export default deleteNoteService