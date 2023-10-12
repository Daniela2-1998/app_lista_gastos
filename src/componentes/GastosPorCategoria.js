import React from 'react';
import {Header, Titulo} from '../elementos/Header';
import {Helmet} from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosDelMes from '../hooks/useObtenerGastosDelMes';

const GastosPorCategoria = () => {
   
    useObtenerGastosDelMes();

    return (
        <>
            <Helmet>
                <title>Gastos por categoría</title>
            </Helmet>

            <Header>
                <BtnRegresar ruta='/'/>
                <Titulo>Gastos por categoría</Titulo>
            </Header>

            <BarraTotalGastado />
        </>
    );
}
 
export default GastosPorCategoria;