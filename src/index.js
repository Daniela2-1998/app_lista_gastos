import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elementos/Contenedor';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import EditarGasto from './componentes/EditarGasto';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import InicioSesion from './componentes/InicioSesion';
import ListaDeGastos from './componentes/ListaDeGastos';
import RegistroUsuarios from './componentes/RegistroUsuarios';
import {Helmet} from 'react-helmet';
import favicon from './imagenes/logo.png';
import Fondo from './elementos/Fondo';
import {AuthProvider} from './contextos/AuthContext';
import RutaProtegida from './componentes/RutaPrivada';



WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel='shortcut icon' href={favicon} type='image/x-icon' />
        <title>App de gastos</title>
      </Helmet>

      <AuthProvider>
        <BrowserRouter>
          <Contenedor>
            <Routes>
              <Route path='/iniciar-sesion' element={<InicioSesion />} />
              <Route path='/crear-cuenta' element={<RegistroUsuarios />} />
             
              <Route path='/categorias' element={
                <RutaProtegida>
                  <GastosPorCategoria />
                </RutaProtegida>
              } />

              <Route path="/lista" element={
                <RutaProtegida>
                  <ListaDeGastos />
                </RutaProtegida>
              } />

              <Route path="/editar/:id" element={
                <RutaProtegida>
                  <EditarGasto />
                </RutaProtegida>
              } />

              <Route path="/" element={
                <RutaProtegida>
                  <App />
                </RutaProtegida>
              } />


              { /*
              <Route path='/categorias' element={<GastosPorCategoria />} />
              <Route path='/lista' element={<ListaDeGastos />} />
              <Route path='/editar/:id' element={<EditarGasto />} />
              <Route path='/' element={<App />} />
              */}

            </Routes>
          </Contenedor>
        </BrowserRouter>
      </AuthProvider>

      <Fondo />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);
