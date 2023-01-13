import { apiUrl } from "./config";

const matterService=async()=>{
    const response=await fetch(apiUrl + "api/matters/get")
    const data = await response.json();
    return data
}

export default matterService