import axios from 'axios';

const instance = axios.create({
    // baseURL: "http://localhost:8080",
    baseURL: "https://evidenceportal-server.onrender.com",
    withCredentials: true,
})

export default instance;
