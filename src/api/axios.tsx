// 3rd party components
import axios from 'axios';


export default axios.create({baseURL: process.env.REACT_APP_API_SERVER});

export const axiosPrivate =  axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});