import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:50000/',

  withCredentials:false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },

});

export default api;
