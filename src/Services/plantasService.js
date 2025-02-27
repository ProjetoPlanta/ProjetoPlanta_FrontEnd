import api from './ServiceConfig';

const API_URL = '/plantas';

const PlantaService = {
  cadastrarPlanta: async (planta) => {
    try {
      const response = await api.post(API_URL, planta);
      return response.status;
    } catch (error) {
      return error
    }
  },

  updatePlanta: async (id,planta) => {
    try {
      const response = await api.put(`${API_URL}/${id}`, planta);
      return response.status;
    } catch (error) {
      return {error: error, message:"Erro ao atualizar planta"}
    }
  },
  
  deletePlanta: async (id) => {
    try {
      const response = await api.delete(`${API_URL}/${id}`);
      return response.status;
    } catch (error) {
      return {error: error, message:"Erro ao deletar Planta"}
    }
  },

  getAllPlantas: async () => {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      return {error: error, message:"Erro ao buscar Planta"}
    }
  },

  getPlanta: async (id) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return {error: error, message:"Erro ao buscar Planta"}
    }
  }
};

export default PlantaService;