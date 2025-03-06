import api from './ServiceConfig';

const API_URL = '/Movimentacoes';

const MovimentacoesService = {
  cadastrarMovimentacoes: async (pedido) => {
    try {
      const response = await api.post('Plantas/Movimentar', pedido);
      return response.status;
    } catch (error) {
      return error
    }
  },

 getAllMovimentacoes: async () => {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      return {error: error, message:"Erro ao buscar Pedido"}
    }
  },


};

export default MovimentacoesService;