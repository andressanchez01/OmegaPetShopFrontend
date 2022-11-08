import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


const EnviosCrear = () => {

    const navigate = useNavigate();

    const [envio, setEnvios] = useState({
        idEnvio: '',
        idCliente: ''
    });

    const { idEnvio, idCliente } = envio;

    useEffect(() => {
        document.getElementById("idEnvio").focus();
    }, [])

    const onChange = (e) => {
        setEnvios({
            ...envio,
            [e.target.name]: e.target.value
        })
    }

    const crearEnvio = async () => {
        const data = {
            idEnvio: envio.idEnvio,
            idCliente: envio.idCliente
        }

        const response = await APIInvoke.invokePOST(`/api/envios`, data);
        const idEnvio = response._id;

        if (idEnvio === '') {
            const msg = "El envio no fue creado correctamente.";
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
            navigate("/Envios");
            const msg = "El envio fue creado correctamente.";
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

            setEnvios({
                idEnvio: '',
                idCliente: ''
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearEnvio();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Creación de Envios"}
                    breadCrumb1={"Listado de Envios"}
                    breadCrumb2={"Creación"}
                    ruta1={"/Envios"}
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
                                        <label htmlFor="idEnvio">Id del Envio</label>
                                        <input type="text"
                                            className="form-control"
                                            id="idEnvio"
                                            name="idEnvio"
                                            placeholder="Ingrese el id del Envio"
                                            value={idEnvio}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="idCliente">Id del Cliente</label>
                                        <input type="text"
                                            className="form-control"
                                            id="idCliente"
                                            name="idCliente"
                                            placeholder="Ingrese el id del cliente"
                                            value={idCliente}
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

export default EnviosCrear;