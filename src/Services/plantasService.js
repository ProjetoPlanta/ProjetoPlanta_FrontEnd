import UpdatePlanta from '../Pages/updatePlanta';
import api from './ServiceConfig';

const API_URL = '/plantas';

const PlantaService = {
  cadastrarPlanta: async (planta) => {
    try {
      const response = await api.post(API_URL, planta);
      return response.status;
    } catch (error) {
      console.error('Erro ao cadastrar planta:', error);
      throw error;
    }
  },

  updatePlanta: async (id,planta) => {
    try {
      const response = await api.put(`${API_URL}/${id}`, planta);
      return response.status;
    } catch (error) {
      console.error('Erro ao cadastrar planta:', error);
      throw error;
    }
  },
  
  deletePlanta: async (id) => {
    try {
      const response = await api.delete(`${API_URL}/${id}`);
      return response.status;
    } catch (error) {
      console.error('Erro ao deletar planta:', error);
      throw error;
    }
  },

  getAllPlantas: async () => {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro  ao acessar Plantas:', error);
      throw error;
    }
  }
};

export default PlantaService;