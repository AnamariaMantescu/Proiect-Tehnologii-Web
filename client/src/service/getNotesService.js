import { apiUrl } from "./config";

const getNotesService = async (userId) => {
  const response = await fetch(apiUrl + "api/notes/get/"+userId);
  const data = await response.json();
  return data;
};

export default getNotesService;
