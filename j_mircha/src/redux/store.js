// Configuro el store global de la app 

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice"; // usersSlice AS usersReducer
import productsReducer from "./productsSlice";


const store = configureStore({
    reducer: {
        users: usersReducer, //hago referencia a lo que guardo
        products: productsReducer,
    },
});


export default store;




//Se crea un objeto por cada uno de los elementos que se necesite. --> Se creara un reducer. "OBJETO QUE SE DESEA ALMACENAR" 

