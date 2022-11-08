import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


const ClientesCrear = () => {

    const navigate = useNavigate();

    const [cliente, setClientes] = useState({
        idCliente: "",
        nombreCliente: "",
        emailCliente: "",
        direccionCliente: "",
        telefonoCliente: "",
        passwordCliente: ""
    });

    const { nombreCliente, telefonoCliente, direccionCliente, idCliente, emailCliente, passwordCliente } = cliente;

    useEffect(() => {
        document.getElementById("idCliente").focus();
    }, [])

    const onChange = (e) => {
        setClientes({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    const crearCliente = async () => {
        const data = {
            idCliente: cliente.idCliente,
            nombreCliente: cliente.nombreCliente,
            telefonoCliente: cliente.telefonoCliente,
            direccionCliente: cliente.direccionCliente,
            emailCliente: cliente.emailCliente,
            passwordCliente: cliente.passwordCliente
        }

        const response = await APIInvoke.invokePOST(`/api/clientes`, data);
        const idCliente = response._id;

        if (idCliente === '') {
            const msg = "El cliente no fue creado correctamente.";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        } else {
            navigate("/Clientes");
            const msg = "El cliente fue creado correctamente.";
            swal({
                title: 'Información',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });

            setClientes({
                idCliente: "",
                nombreCliente: "",
                emailCliente: "",
                direccionCliente: "",
                telefonoCliente: "",
                passwordCliente: ""
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearCliente();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Creación de Clientes"}
                    breadCrumb1={"Listado de Clientes"}
                    breadCrumb2={"Creación"}
                    ruta1={"/Clientes"}
                />

                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">

                            <form onSubmit={onSubmit}>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="idCliente">Id del Cliente</label>
                                        <input type="text"
                                            className="form-control"
                                            id="idCliente"
                                            name="idCliente"
                                            placeholder="Ingrese el id del Cliente"
                                            value={idCliente}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nombreCliente">Nombre del Cliente</label>
                                        <input type="text"
                                            className="form-control"
                                            id="nombreCliente"
                                            name="nombreCliente"
                                            placeholder="Ingrese el nombre del cliente"
                                            value={nombreCliente}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="direccionCliente">Dirección del Cliente</label>
                                        <input type="text"
                                            className="form-control"
                                            id="direccionCliente"
                                            name="direccionCliente"
                                            placeholder="Ingrese la dirección del cliente"
                                            value={direccionCliente}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="telefonoCliente">Telefono del Cliente</label>
                                        <input type="text"
                                            className="form-control"
                                            id="telefonoCliente"
                                            name="telefonoCliente"
                                            placeholder="Ingrese el telefono del cliente"
                                            value={telefonoCliente}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="emailCliente">Email del Cliente</label>
                                        <input type="text"
                                            className="form-control"
                                            id="emailCliente"
                                            name="emailCliente"
                                            placeholder="Ingrese el email del cliente"
                                            value={emailCliente}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="passwordCliente">Password del Cliente</label>
                                        <input type="text"
                                            className="form-control"
                                            id="passwordCliente"
                                            name="passwordCliente"
                                            placeholder="Ingrese el password del cliente"
                                            value={passwordCliente}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Crear</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ClientesCrear;