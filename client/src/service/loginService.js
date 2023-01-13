import { apiUrl } from "./config";

const loginService=async(email,password)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    };
    const response = await fetch(apiUrl + "login", requestOptions);
    const data = await response.json();
    return data
}

export default loginService