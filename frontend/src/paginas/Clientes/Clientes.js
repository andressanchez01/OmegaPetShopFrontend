import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const Clientes = () => {

    const [clientes, setClientes] = useState([]);

    const cargarClientes = async () => {
        const response = await APIInvoke.invokeGET(`/api/clientes`);
        console.log(response.clientes);
        setClientes(response.clientes);
    }

    useEffect(() => {
        cargarClientes();
    }, [])

    const eliminarCliente = async (e, idCliente) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/clientes/${idCliente}`);

        if (response.msg === 'Cliente eliminado') {
            const msg = "El cliente fue borrado correctamente.";
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
            cargarClientes();
        } else {
            const msg = "El cliente no fue borrado correctamente.";
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
        }
    }

    return (
        <div>
            <div className='wrapper'>
                <Navbar></Navbar>
                <SidebarContainer></SidebarContainer>
                <div className="content-wrapper">
                    <ContentHeader
                        titulo={"Clientes"}
                        breadCrumb1={"Inicio"}
                        breadCrumb2={"Clientes"}
                        ruta1={"/home"}
                    />
                    <section className="content">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title"><Link to={"/ClientesCrear"} className="btn btn-block btn-primary btn-sm">Crear Cliente</Link></h3>
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
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '10%' }}>Id Transacción</th>
                                            <th style={{ width: '10%' }}>Id del cliente</th>
                                            <th style={{ width: '10%' }}>Nombre del cliente</th>
                                            <th style={{ width: '10%' }}>Email de cliente</th>
                                            <th style={{ width: '10%' }}>Direccion de cliente</th>
                                            <th style={{ width: '10%' }}>Telefono de cliente</th>
                                            <th style={{ width: '10%' }}>Password de cliente</th>
                                            <th style={{ width: '30%' }}>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            clientes.map(
                                                item =>
                                                    <tr key={item._id}>
                                                        <td>{item._id}</td>
                                                        <td>{item.idCliente}</td>
                                                        <td>{item.nombreCliente}</td>
                                                        <td>{item.emailCliente}</td>
                                                        <td>{item.direccionCliente}</td>
                                                        <td>{item.telefonoCliente}</td>
                                                        <td>{item.passwordCliente}</td>
                                                        <td>
                                                            <Link to={`/ClientesEditar/${item._id}@${item.idCliente}`} className="btn btn-sm btn-primary">Editar</Link>&nbsp;&nbsp;
                                                            <button onClick={(e) => eliminarCliente(e, item._id)} className='btn btn-sm btn-danger'>Borrar</button>
                                                        </td>
                                                    </tr>
                                            )
                                        }


                                    </tbody>
                                </table>

                            </div>

                        </div>


                    </section>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
}

export default Clientes;