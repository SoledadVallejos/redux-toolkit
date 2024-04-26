import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from "../redux/usersSlice";


const UsersList = () => {

    const users = useSelector((state) => state.users); // le pega a la data de esos users , gestiona el estado

    const dispatch = useDispatch(); // la que despacha la accion correspondiente --> solicita la funcion del slice, a traves del reducer del slice del estado fetchUsers


    //Como hago una peticion asincrona, uso el useEffect
    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                // handle success
                console.log(res)
                dispatch(fetchUsers(res.data)) //solicita la funcion del slice, a traves del reducer del slice del estado fetchUsers
            }

            )
            .catch((err) =>
                // handle error
                console.log(err)
            )

    }, [dispatch])// dispatch, que se encarga de gestionar se ejecuta



    return (
        <>
            <h2>Lista de Usuarios de JSON Placeholder </h2>
            {console.log(users)}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </>
    )
}

export default UsersList;

// Use "json-server" --> simila una db, comando para levantarlo : npm run api
// en package json, escucha activa :  "api": "npx json-server --watch db.json --port 3001"



