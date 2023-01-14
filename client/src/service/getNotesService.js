import { apiUrl } from "./config";

const getNotesService = async (userId) => {
  const response = await fetch(apiUrl + "api/notes/get/"+userId);
  const data = await response.json();
  console.log('data in service',data)
  return data;
};

export default getNotesService;
