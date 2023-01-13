import { apiUrl } from "./config";

const getNotesService = async () => {
  const response = await fetch(apiUrl + "api/notes/get");
  const data = await response.json();
  return data;
};

export default getNotesService;
