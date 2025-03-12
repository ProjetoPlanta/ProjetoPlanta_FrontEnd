import api from './ServiceConfig';

const API_URL = '/Pedidos';

const PedidoService = {
  cadastrarPedido: async (pedido) => {
    try {
      const response = await api.post(API_URL, pedido);
      return response;
    } catch (error) {
      return error
    }
  },

  updatePedido: async (id,status) => {
    try {
      const response = await api.patch(`${API_URL}/${id}/status `, status);
      return response.status;
    } catch (error) {
      return {error: error, message:"Erro ao atualizar Pedido"}
    }
  },
  
  getAllPedidos: async () => {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      return {error: error, message:"Erro ao buscar Pedido"}
    }
  },


};

export default PedidoService;