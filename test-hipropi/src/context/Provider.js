import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";


export const AppContext = React.createContext();

const Provider = (props) => {
    const [state, setState] = useState({});
    const history = useHistory();

    var login = async function (user) {
        let url = "http://localhost:3000/api/users/login";
        let respuesta = await axios.post(url, user)
        let res = await respuesta.data
        return res
    }
    var getProducts = async function () {
        let url = "http://localhost:3000/api/products"
        await axios.get(url)
            .then(res => res.data)
            .then(data => {
                setState({
                    ...state,
                    products: data.data
                })
            })
            .catch(e => {
                console.log(e)
                alert("algo salio mal")
            })
    }
    var oneProduct = async function (id) {
        console.log(id.id)
        let url = `http://localhost:3000/api/products/${id.id}`
        await axios.get(url)
            .then(res => res.data)
            .then(data => {
                setState({
                    ...state,
                    currentProduct: data.data
                })
            })
            .catch(e => {
                console.log(e)
                alert("algo salio mal")
            })
    }
    var currentUser = function () {
        if (state.currentUser) {
            return true
        } else {
            history.push('/')
            window.location.reload();
        }
    }

    return (
        <AppContext.Provider value={{ state, setState, login, getProducts, currentUser, oneProduct }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default Provider
