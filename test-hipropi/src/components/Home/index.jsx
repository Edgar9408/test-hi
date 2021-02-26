import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/Provider';
import { useHistory } from 'react-router-dom';
import "./login.css";

const Home = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const { state, setState, login } = useContext(AppContext);
    const history = useHistory();


    function User(e) {
        e.preventDefault();
        login(user).then((a) => {
            setState({
                ...state,
                currentUser:a
            })
            history.push('/catalogue')
        }).catch((err) => {
            console.log(err);
            window.location.reload();
            alert("No se pudo iniciar sesion");
        })
        setUser({
            username: "",
            password: ""
        })
    }

    return (
        <div className="cont">
        <div className='container-fluid containerLogin'>
            <form className="formcont" onSubmit={(e) => User(e)}>
                <h1>Iniciar sesion</h1>
                <div className="formNombre">
                    <label >Email</label>
                    <br />
                    <input className="input" type="username" name="username" placeholder="Email" value={user.email} onChange={e => setUser({ ...user, username: e.target.value })} required />
                </div>
                <div className="formNombre">
                    <label >Contraseña</label>
                    <br />
                    <input className="input" type="password" name="password" placeholder="Contraseña" value={user.contraseña} onChange={e => setUser({ ...user, password: e.target.value })} required />
                </div>
                <div className='Boton'>
                    <input className="submit" type="submit" value="INICIAR SESIÓN" />
                </div>
            </form>
        </div>
        </div>
    )
}

export default Home
