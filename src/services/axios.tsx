import axios from "axios";
import { backendUrl } from ".";

// let config = {
//     "Authorization" : "",
//     "Content-Type" : "application/json"
// };

// export const http = axios.create({
//     baseURL : "http://127.0.0.1:8000/api",
//     headers : config
// });

// let token = sessionStorage.getItem("token");
// console.log('token: ', token)
// if (token) {
//     config["Authorization"] = `Token ${token}`;
// };
const httpInstantiate = () => {
    let token = sessionStorage.getItem("token");
    
    let config = {
        "Authorization" : "",
        "Content-Type" : "application/json"
    };

    // console.log('Axios token: ', token)

    if (token) {
        config["Authorization"] = `Token ${token}`;
    }; 

    const http = axios.create({
        baseURL : "http://127.0.0.1:8000/api",
        headers : config
    });
    return http;
}

const httpInstantiateEx = (token: string) => {
    
    let config = {
        "Authorization" : "",
        "Content-Type" : "application/json"
    };

    // console.log('Axios token: ', token)

    if (token) {
        config["Authorization"] = `Token ${token}`;
    }; 

    const http = axios.create({
        baseURL : "http://127.0.0.1:8000/api",
        headers : config
    });
    return http;
}

export const http = httpInstantiate()

export const httpGenerator = (token: string) => httpInstantiateEx(token)
