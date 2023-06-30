import axios from 'axios';

const getUrl = () => (process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : window.location.origin + '/api');

const client = axios.create({
    baseURL: getUrl(),
    withCredentials: true,
    headers: {
        Authorization: localStorage.getItem('token'),
    },
});

export default client;
