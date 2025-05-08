import api from './ServiceConfig';

const API_URL = '/campanhas';

const CampanhaService = {
  cadastrarCampanhas: async (campanha) => {
    try {
      const response = await api.post(API_URL, campanha);
      return response.status;
    } catch (error) {
      return error;
    }
  },

  updatecampanha: async (id, campanha) => {
    try {
      const response = await api.put(`${API_URL}/${id}`, campanha);
      return response.status;
    } catch (error) {
      return { error: error, message: "Erro ao atualizar campanha" };
    }
  },

  deletecampanha: async (id) => {
    try {
      const response = await api.delete(`${API_URL}/${id}`);
      return response.status;
    } catch (error) {
      return { error: error, message: "Erro ao deletar campanha" };
    }
  },

  getAllcampanhas: async () => {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      return { error: error, message: "Erro ao buscar campanha" };
    }
  },

  getcampanha: async (id) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return { error: error, message: "Erro ao buscar Planta" };
    }
  },

  
};

export default CampanhaService;