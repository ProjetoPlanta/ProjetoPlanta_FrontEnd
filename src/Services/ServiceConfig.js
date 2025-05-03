import axios from 'axios';

const api = axios.create({
  baseURL: 'https://projetoplanta-gedsc0epcqetaeht.brazilsouth-01.azurewebsites.net/',

  withCredentials:false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },

});

export default api;
