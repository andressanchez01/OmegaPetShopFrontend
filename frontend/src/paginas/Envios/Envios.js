import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../componentes/ContentHeader';
import Footer from '../../componentes/Footer';
import Navbar from '../../componentes/Navbar';
import SidebarContainer from '../../componentes/SidebarContainer';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const Envios = () => {

    const [envios, setEnvios] = useState([]);

    const cargarEnvios = async () => {
        const response = await APIInvoke.invokeGET(`/api/envios`);
        console.log(response.envios);
        setEnvios(response.envios);
    }

    useEffect(() => {
        cargarEnvios();
    }, [])

    const eliminarEnvio = async (e, idEnvio) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/envios/${idEnvio}`);

        if (response.msg === 'Envio eliminado') {
            const msg = "El envio fue borrado correctamente.";
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
            cargarEnvios();
        } else {
            const msg = "El envio no fue borrado correctamente.";
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
                        titulo={"Envios"}
                        breadCrumb1={"Inicio"}
                        breadCrumb2={"Envios"}
                        ruta1={"/home"}
                    />
                    <section className="content">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title"><Link to={"/EnviosCrear"} className="btn btn-block btn-primary btn-sm">Crear Envio</Link></h3>
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
                                            <th style={{ width: '10%' }}>Id del envio</th>
                                            <th style={{ width: '10%' }}>Id del cliente</th>
                                            <th style={{ width: '10%' }}>Usuario creador</th>
                                            <th style={{ width: '10%' }}>Fecha</th>
                                            <th style={{ width: '10%' }}>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            envios.map(
                                                item =>
                                                    <tr key={item._id}>
                                                        <td>{item._id}</td>
                                                        <td>{item.idEnvio}</td>
                                                        <td>{item.idCliente}</td>
                                                        <td>{item.creador}</td>
                                                        <td>{item.creado}</td>
                                                        <td>
                                                            <Link to={`/EnviosEditar/${item._id}@${item.idEnvio}`} className="btn btn-sm btn-primary">Editar</Link>&nbsp;&nbsp;
                                                            <button onClick={(e) => eliminarEnvio(e, item._id)} className='btn btn-sm btn-danger'>Borrar</button>
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

export default Envios;