import { createSlice } from '@reduxjs/toolkit'



export const counterSlice = createSlice({
  name: 'counter', //  name con el cual la acciones salen disparadas  
  initialState: {
    counter : 10
  },
  reducers: {
    increment: (state) => {
      state.counter += 1
    },
   
    decrement: (state) => {
        state.counter -= 1
      },
      incrementBy: (state, action) => { 
       state.counter += action.payload
        
      },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementBy } = counterSlice.actions // la funcion que se crea, lo que retorna tendra las acciones en el objeto

