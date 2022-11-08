import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke'
import swal from 'sweetalert';

const EnviosEditar = () => {

    const navigate = useNavigate();

    const { idenvio } = useParams();
    let arreglo = idenvio.split('@');
    const nombreEnvio = arreglo[1];

    const [envio, setEnvios] = useState({
        idEnvio: nombreEnvio,
    });

    const { idEnvio } = envio;

    useEffect(() => {
        document.getElementById("idEnvio").focus();
    }, [])

    const onChange = (e) => {
        setEnvios({
            ...envio,
            [e.target.name]: e.target.value
        })
    }

    const editarEnvio = async () => {
        let arreglo = idenvio.split('@');
        const idTransaccion = arreglo[0];

        const data = {
            idEnvio: envio.idEnvio
        }

        const response = await APIInvoke.invokePUT(`/api/envios/${idTransaccion}`, data);
        const idEnvioEditado = response.envio._id;

        if (idEnvioEditado !== idTransaccion) {
            const msg = "El proyecto no fue editado correctamente.";
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
            const msg = "El proyecto fue editado correctamente.";
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
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        editarEnvio();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Edición de Envios"}
                    breadCrumb1={"Listado de Envio"}
                    breadCrumb2={"Edición"}
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
                                        <label htmlFor="nombre">Nombre</label>
                                        <input type="text"
                                            className="form-control"
                                            id="idEnvio"
                                            name="idEnvio"
                                            placeholder="Ingrese el nombre del proyecto"
                                            value={idEnvio}
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Editar</button>
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

export default EnviosEditar;