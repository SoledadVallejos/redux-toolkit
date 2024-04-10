import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  readProducts,
  updateProduct,
} from "../redux/productsSlice";

const ProductsList = () => {
  const products = useSelector((state) => state.products); // data que viene de la api || products es state.products y este state.productus es un objeto que dentro tiene una propiedad llamada data que es donde se cargan esos datos "initialState"
  const dispatch = useDispatch();

  const [newProductName, setNewProductName] = useState(""); // controla lo que introduce el usuario en ese input
  const [editedProduct, setEditedProduct] = useState(null); // controla lo que introduce el usuario en ese input

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        console.log(res);
        dispatch(readProducts(res.data));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  const handleCreateProduct = () => {
    if (newProductName) {//se valida que exista newProductName
      const newProduct = { id: Date.now(), name: newProductName }; //utiliza el met de la fecha para establecerlo como el id del producto
      dispatch(createProduct(newProduct)); // EL DISPATCH ESTADO VIRTUAL QUE ME GENERA REDUX TOLK PARA LA APP FRONT

      axios // LA PETICION AXIOS ES PARA PEGARLE AL SERVIDOR
        .post("http://localhost:3001/products", newProduct) //pega a la api con el post para guardar la info
        .then(() => {
          setNewProductName("");//limpia el valor del input
        })
        .catch((err) => console.error(err));
    }
  };

  const handleUpdateProduct = () => {
    if (editedProduct) { // si editedProduct tiene valor  ejecuto el dispatch 
      dispatch(
        updateProduct({ id: editedProduct.id, name: editedProduct.name })
      );

      axios
        .put(`http://localhost:3001/products/${editedProduct.id}`, {// paso el id y la data a actualizar
          name: editedProduct.name,
        })
        .then(() => setEditedProduct(null))
        .catch((err) => console.error(err));
    }
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id)); 

    axios
      .delete(`http://localhost:3001/products/${id}`)// concatena el id
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h2>CRUD de Productos</h2>
      <h3>Lista de Productos</h3>
      <ul>
        {products.data.map((product) => (
          <li key={product.id}> 
          {/* renderizado condicional */}
            {editedProduct?.id === product.id ? ( 
              <div>
                <input
                  type="text"
                  value={editedProduct.name}
                  onChange={(e) =>
                    setEditedProduct({ ...editedProduct, name: e.target.value }) // lo q venga de editedProduct desdestructura con lo q el usuario escriba --> no se piere el id 
                  }
                />
                <button onClick={handleUpdateProduct}>Actualizar</button>
              </div>
            ) : (
              <div>
                <span>{product.name}</span>
                <button onClick={() => setEditedProduct(product)}> {/* le pasamos todo el product --> inicialmente empieza en null */}
                  Editar
                </button>
                <button onClick={() => handleDeleteProduct(product.id)}> {/* id del  producto en cuestion  */}
                  Eliminar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <aside>
        <input
          type="text"
          value={newProductName}//vinvulo el valor de la variable newProductName
          onChange={(e) => setNewProductName(e.target.value)} // y al cambio lo vinculo setNewProductName con lo que el usuario escriba
        />
        <button onClick={handleCreateProduct}>Agregar Producto</button>
      </aside>
    </>
  );
};

export default ProductsList;