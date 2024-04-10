// Se crea la estructura del slice. Slice --> "pedacito o rebanada".

import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",//name -> identifica redux toolkit
    initialState: [],
    reducers: { // los reducers seran las funciones 
        fetchUsers: (state, action) => {
            return action.payload // devuelve el payload -> data 
        }
    }
})


export const { fetchUsers } = usersSlice.actions;  // "usersSlice" IMPLEMENTACION DE REDUX TOOLKIT PARA EL MANEJO DE LAS ACCIONES, SERA IMPLEMENTADO EN SU PROPIA ACTIONS --> EXPORT ACTION

export default usersSlice.reducer; // exporto el reducer que luego sera usado en el store --> EXPORT REDUCER

// export por default -> asignacion de nombre "usersReducer" - sin desestructurar"





/*
  ------------------------------------------------------------------------------------------------------------------------------------

  NOTA:

- actions --> Los actions son objetos de js que contiene información y le indica a redux que operación se va a ejecutar sobre el store.
              Son descripciones de lo que queremos hacer.

- payload --> es el valor que se le pega a la data --> p. actualice

- reducers --> Un reducers es una FUNCION que espera 2 parametros, el estado actual para saber que datos  tiene la interfaz en ese momento
               y el action para saber que datos debe ejecutar y que datos usar si es es que trae un payload.

 ------------------------------------------------------------------------------------------------------------------------------------
 */



