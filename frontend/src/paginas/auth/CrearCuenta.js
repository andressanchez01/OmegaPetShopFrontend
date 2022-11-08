import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const CrearCuenta = () => {

    const [usuario, setUsuario] = useState({
        nombreCliente: "",
        telefonoCliente: "",
        direccionCliente: "",
        idCliente: "",
        emailCliente: "",
        passwordCliente: "",
        confirmar:"",

    });

    const {nombreCliente, telefonoCliente, direccionCliente, idCliente, emailCliente, passwordCliente, confirmar} = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }   

    useEffect( () => {
        document.getElementById("nombreCliente").focus();
    },[])

    const crearCuenta = async () => {

        if(passwordCliente !== confirmar){
            const msg = "Las contraseñas son diferentes.";
            swal({
                tittle: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    contirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }else{
            const data = {
                nombreCliente: usuario.nombreCliente,
                telefonoCliente: usuario.telefonoCliente,
                direccionCliente: usuario.direccionCliente,
                idCliente: usuario.idCliente,
                emailCliente: usuario.emailCliente,
                passwordCliente: usuario.passwordCliente,
                confirmar: usuario.confirmar
            }
            const response = await APIInvoke.invokePOST(`/cliente/crear`, data);
            const msg = "El usuario fue creado correctamente.";
            swal({
                tittle: 'Información',
                text: msg,
                icon: 'success',
                buttons: {
                    contirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });

            setUsuario({
                nombreCliente: "",
                telefonoCliente: "",
                direccionCliente: "",
                idCliente: "",
                emailCliente: "",
                passwordCliente: "",
                confirmar:"",
            })
        }
        
    }


    const onSubmit = (e) => {
        e.preventDefault();
        crearCuenta();
    }   
    return (  
        <div className="hold-transition login-page">
        <div className="login-box">
            <div className="login-logo">
                <Link to={"#"}><b>Registar</b> Cliente</Link>
            </div>
            {/* /.login-logo */}
            <div className="card">
                <div className="card-body login-card-body">
                    <p className="login-box-msg">Ingrese los datos de usuario.</p>
                    <form onSubmit={onSubmit}>
                        <div className="input-group mb-3">
                            <input type="text" 
                                 className="form-control"
                                 placeholder="Nombre" 
                                 id="nombreCliente"
                                 name="nombreCliente"
                                 value = {nombreCliente}
                                 onChange = {onChange}
                                 required 
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-user" />
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" 
                                 className="form-control"
                                 placeholder="Telefono" 
                                 id="telefonoCliente"
                                 name="telefonoCliente"
                                 value = {telefonoCliente}
                                 onChange = {onChange}
                                 required 
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-phone" />
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" 
                                 className="form-control"
                                 placeholder="Dirección" 
                                 id="direccionCliente"
                                 name="direccionCliente"
                                 value = {direccionCliente}
                                 onChange = {onChange}
                                 required 
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-home" />
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" 
                                 className="form-control"
                                 placeholder="Id" 
                                 id="idCliente"
                                 name="idCliente"
                                 value = {idCliente}
                                 onChange = {onChange}
                                 required 
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-id-card" />
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="email" 
                                 className="form-control"
                                 placeholder="Email" 
                                 id="emailCliente"
                                 name="emailCliente"
                                 value = {emailCliente}
                                 onChange = {onChange}
                                 required 
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope" />
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                id="passwordCliente"
                                name="passwordCliente"
                                value = {passwordCliente}
                                 onChange = {onChange}
                                 required 
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock" />
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password"
                                className="form-control"
                                placeholder="Confirmar Contraseña"
                                id="confirmar"
                                name="confirmar"
                                value = {confirmar}
                                 onChange = {onChange}
                                 required 
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock" />
                                </div>
                            </div>
                        </div>
                        <div className="social-auth-links text-center mb-3">
                            <button type='submit' className="btn btn-block btn-primary">
                                Registrar
                            </button>
                            <Link to={"/"} className="btn btn-block btn-danger">
                                Regresar al Login
                            </Link>
                        </div>
                    </form>
                    {/* /.social-auth-links */}
                </div>
                {/* /.login-card-body */}
            </div>
        </div>
        {/* /.login-box */}
    </div>
    );
}
 
export default CrearCuenta;