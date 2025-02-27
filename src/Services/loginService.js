import api from './ServiceConfig';

const API_URL = '/account/login';

const LoginService = {
  login: async (credentials) => {
    try {
      const response = await api.post(API_URL, credentials);
      return response.data;
    } catch (error) {
   
    }
  },

  
};

export default LoginService;