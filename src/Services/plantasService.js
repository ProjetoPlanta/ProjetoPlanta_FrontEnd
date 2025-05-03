import api from './ServiceConfig';

const API_URL = 'projetoplanta-gedsc0epcqetaeht.brazilsouth-01.azurewebsites.net/plantas';
const QR_CODE_URL = 'projetoplanta-gedsc0epcqetaeht.brazilsouth-01.azurewebsites.net/api/qrcode';

const PlantaService = {
  cadastrarPlanta: async (planta) => {
    try {
      const response = await api.post(API_URL, planta);
      return response.status;
    } catch (error) {
      return error;
    }
  },

  updatePlanta: async (id, planta) => {
    try {
      const response = await api.put(`${API_URL}/${id}`, planta);
      return response.status;
    } catch (error) {
      return { error: error, message: "Erro ao atualizar planta" };
    }
  },

  deletePlanta: async (id) => {
    try {
      const response = await api.delete(`${API_URL}/${id}`);
      return response.status;
    } catch (error) {
      return { error: error, message: "Erro ao deletar Planta" };
    }
  },

  getAllPlantas: async () => {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      return { error: error, message: "Erro ao buscar Planta" };
    }
  },

  getPlanta: async (id) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return { error: error, message: "Erro ao buscar Planta" };
    }
  },

  getQRCode: async (id) => {
    try {
      const response = await api.get(`${QR_CODE_URL}/${id}`, { responseType: 'blob' });
      return URL.createObjectURL(response.data); // Cria um objeto URL para exibir a imagem
    } catch (error) {
      return { error: error, message: "Erro ao gerar QR Code" };
    }
  }
};

export default PlantaService;