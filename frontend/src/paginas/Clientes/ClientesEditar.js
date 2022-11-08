import React, { useState, useEffect } from 'react';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke'
import swal from 'sweetalert';

const ClientesEditar = () => {

    const navigate = useNavigate();

    const { idcliente } = useParams();
    let arreglo = idcliente.split('@');
    const nombreCliente = arreglo[1];

    const [cliente, setClientes] = useState({
        idCliente: nombreCliente
    });

    const { idCliente } = cliente;

    useEffect(() => {
        document.getElementById("idCliente").focus();
    }, [])

    const onChange = (e) => {
        setClientes({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    const editarCliente = async () => {
        let arreglo = idcliente.split('@');
        const idTransaccion = arreglo[0];

        const data = {
            idCliente: cliente.idCliente
        }

        const response = await APIInvoke.invokePUT(`/api/clientes/${idTransaccion}`, data);
        const idClienteEditado = response.cliente._id;

        if (idClienteEditado !== idTransaccion) {
            const msg = "El id del cliente no fue editado correctamente.";
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
            const msg = "El id del cliente fue editado correctamente.";
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
        editarCliente();
    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Edición de Clientes"}
                    breadCrumb1={"Listado de Cliente"}
                    breadCrumb2={"Edición"}
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
                                        <label htmlFor="nombre">Id cliente</label>
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

export default ClientesEditar;