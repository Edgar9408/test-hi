import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/Provider';
import "./Details.css"

const Details = (id) => {
    const { state, currentUser, oneProduct } = useContext(AppContext);
    useEffect(() => {
        currentUser();
        oneProduct(id);
    }, [])
    if (state && state.currentProduct) {
        return (
            <div className="containercard">
                <div className="detailsCard card mb-1 mt-1">
                    <img
                        className="card-img-top"
                        alt=""
                        src={state.currentProduct.img}
                    />
                    <div className="card-body CardText">
                        <h5 style={{ textTransform: "capitalize" }} className="tittle"> {state.currentProduct.name} </h5>
                        <p className="card-text">ID del producto:&nbsp; {state.currentProduct.id} </p>
                        <p className="card-text">Descripcion: &nbsp; {state.currentProduct.description} </p>
                        <p className="card-text">Moneda: &nbsp; {state.currentProduct.typemoney} </p>
                        <p className="card-text">Precio: &nbsp; €{state.currentProduct.price} </p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>no se pudo cargar el producto</div>
        )
    }
}

export default Details
