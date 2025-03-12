import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  plantas: [],
  plantasDetalhadas: [],
  data: new Date().toISOString(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPlanta: (state, action) => {
      const id = action.payload.id
     
      const plantaIndex = state.plantas.findIndex(p => p.plantaId === id);
      if (plantaIndex >= 0) {
        state.plantas[plantaIndex].quantidade = action.payload.quantidade;
      } else {
        state.plantas.push({ plantaId: id, quantidade:  action.payload.quantidade });
        state.plantasDetalhadas.push(action.payload)
      }
    },
    removePlanta: (state, action) => {
      const id = action.payload.id
      state.plantas = state.plantas.filter(p => p.plantaId !== id)
      state.plantasDetalhadas = state.plantasDetalhadas.filter(p => p.id !==id);
    },
   
  }
});

export const { addPlanta, removePlanta, } = cartSlice.actions;
export default cartSlice.reducer;
