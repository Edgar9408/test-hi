import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/Provider';
import Card from "../Card/index.jsx";


const Catalogue = () => {
    const { state, getProducts, currentUser } = useContext(AppContext);
    useEffect(() => {
        currentUser();
        getProducts();
    }, [])
    return (
        <div>
            {!state.products ? <div className="alert alert-warning" role="alert">No hay productos cargadas.</div> :
                <div className="container-fluid">
                    <div className="row">
                        {state.products && state.products.map(p =>
                            <div className="col-10 col-lg-3 col-sm-6" key={p.id}>
                                <Card
                                    id={p.id}
                                    img={p.img}
                                    name={p.name}
                                    description={p.description}
                                    price={p.price}
                                />
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default Catalogue
