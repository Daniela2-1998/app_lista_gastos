import React, {useContext} from 'react';
import {Header, Titulo} from '../elementos/Header';
import {Helmet} from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';

const ListaDeGastos = () => {

    return (
        <>
            <Helmet>
                <title>Lista de gastos</title>
            </Helmet>

            <Header>
                <BtnRegresar ruta='/' />
                <Titulo>Lista de gastos</Titulo>
            </Header>

            <BarraTotalGastado />
        </>
    );
}
 
export default ListaDeGastos;