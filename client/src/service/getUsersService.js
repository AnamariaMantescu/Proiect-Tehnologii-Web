import { apiUrl } from "./config";

const getUsersService = async () => {
  try {
    const response = await fetch(apiUrl+'api/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default getUsersService