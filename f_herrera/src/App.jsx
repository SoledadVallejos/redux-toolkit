import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { decrement, increment, incrementBy } from './store/slices/counter';

function App() {
  const { counter } = useSelector(state => state.counter) // del initialState toma el counter
  const dispatch = useDispatch();

  return (
    <>
    <span> Counter is : {counter} </span>
      <button type='button' onClick={()=> { dispatch(increment())}}>
        Increment
      </button>
      <button type='button' onClick={()=> { dispatch(decrement())}}>
        Decrement
      </button>
      <button type='button' onClick={()=> { dispatch(incrementBy(2))}}>
      Increment by 2
      </button>

    </>
  )
}

export default App


//useSelector : selecionar algo del store

// useDispatch : acceso a la funcion dispatch que sirve para despachar acciones --> incrementar, decrementar ...