import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({ //configuro el objeto
  name: "products",// IMPORTANTE -> Se solicita la variable en particular cuando se la manda a llamar para gestionar el estado global 
  initialState: {
    data: [],
  },
  reducers: { //manejo la logica "accciones" del CRUD
    createProduct: (state, action) => {
      state.data.push(action.payload); // agrego lo que viene en el action.payload
    },
    readProducts: (state, action) => {
      state.data = action.payload;// el estado de esta slice tiene una propiedad llamada data. A esa data pegale el valor del action.payload --> El payload es el valor que viene de la api que se solicita 
    },
    updateProduct: (state, action) => {
      const { id, name } = action.payload; // desestructuro el action.payload ya que necesito hacer un filtrado para encontrar el id de lo que quiere actualizar
      const product = state.data.find((product) => product.id === id); // encuentra el producto que su product.id  sea igual la variable que desestrucuture "id"

      if (product) {//si esa variable trae algo, actualiza el name 
        product.name = name;
      }
    },
    deleteProduct: (state, action) => {
      const id = action.payload; // desestructuro id
      state.data = state.data.products.filter((product) => product.id !== id); // cuando product.id sea diferente de id lo dejas pasar, cuando no lo descartas
    },
  },
});

export const { createProduct, readProducts, updateProduct, deleteProduct } =
  productsSlice.actions; //action de ese pedacito de estado que se gestiona

export default productsSlice.reducer;