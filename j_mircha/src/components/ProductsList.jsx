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
  const products = useSelector((state) => state.products); // data que viene de la api || state.productus es un objeto que dentro tiene una propiedad llamada data que es donde se cargan esos datos "initialState"
  const dispatch = useDispatch();

  const [newProductName, setNewProductName] = useState(""); 
  const [editedProduct, setEditedProduct] = useState(null); 

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
    if (newProductName) {
      const newProduct = { id: Date.now(), name: newProductName }; // metodo de la fecha -> id
      dispatch(createProduct(newProduct)); // EL DISPATCH ESTADO VIRTUAL QUE ME GENERA REDUX TOOLKIT PARA LA APP FRONT

      axios // LA PETICION -> PEGA AL SERVIDOR
        .post("http://localhost:3001/products", newProduct) //guarda la info
        .then(() => {
          setNewProductName("");
        })
        .catch((err) => console.error(err));
    }
  };

  const handleUpdateProduct = () => {
    if (editedProduct) { 
      dispatch(
        updateProduct({ id: editedProduct.id, name: editedProduct.name })
      );

      axios
        .put(`http://localhost:3001/products/${editedProduct.id}`, {// id y data a actualizar
          name: editedProduct.name,
        })
        .then(() => setEditedProduct(null))
        .catch((err) => console.error(err));
    }
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id)); 

    axios
      .delete(`http://localhost:3001/products/${id}`)// id
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
                    setEditedProduct({ ...editedProduct, name: e.target.value }) // desestructura con lo que el usuario escriba --> no se pierde el id 
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
                <button onClick={() => handleDeleteProduct(product.id)}> {/* id del producto en cuestion */}
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
          value={newProductName}// valor de la variable newProductName
          onChange={(e) => setNewProductName(e.target.value)} // cambio lo vinculo setNewProductName -> usuario
        />
        <button onClick={handleCreateProduct}>Agregar Producto</button>
      </aside>
    </>
  );
};

export default ProductsList;