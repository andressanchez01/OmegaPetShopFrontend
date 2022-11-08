import React, {Fragment} from 'react';
import{ BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CrearCuenta from './paginas/auth/CrearCuenta';
import CrearCuentaUsuario from './paginas/auth/CrearCuentaUsuario';
import Login from './paginas/auth/Login';
import Envios from './paginas/Envios/Envios';
import Home from './paginas/Home';
import EnviosCrear from './paginas/Envios/EnviosCrear';
import EnviosEditar from './paginas/Envios/EnviosEditar';
import Clientes from './paginas/Clientes/Clientes';
import ClientesCrear from './paginas/Clientes/ClientesCrear';
import ClientesEditar from './paginas/Clientes/ClientesEditar';

function App() {
  return (
    <Fragment>
      <Router>
          <Routes>
            <Route path="/" exact element={<Login/>}/>
            <Route path="/crear-cuenta" exact element={<CrearCuenta/>}/>
            <Route path="/crear-cuenta-usuario" exact element={<CrearCuentaUsuario/>}/>
            <Route path="/home" exact element={<Home/>}/>
            <Route path="/envios" exact element={<Envios/>}/>
            <Route path="/EnviosCrear" exact element={<EnviosCrear/>}/>
            <Route path="/EnviosEditar/:idenvio" exact element={<EnviosEditar/>}/>
            <Route path="/clientes" exact element={<Clientes/>}/>
            <Route path="/ClientesCrear" exact element={<ClientesCrear/>}/>
            <Route path="/ClientesEditar/:idcliente" exact element={<ClientesEditar/>}/>
          </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
