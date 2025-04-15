import axios from 'axios';

const api = axios.create({
  baseURL: 'http://projetoplanta-gedsc0epcqetaeht.brazilsouth-01.azurewebsites.net/',

  withCredentials:false,
  headers: {
    'Content-Type': 'application/json'
  },

});

export default api;
