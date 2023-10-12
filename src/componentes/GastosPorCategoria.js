import React from 'react';
import {Header, Titulo} from '../elementos/Header';
import {Helmet} from 'react-helmet';
import BtnRegresar from '../elementos/BtnRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosDelMesPorCategoria from '../hooks/useObtenerGastosDelMesPorCategoria';
import {ListaDeCategorias, ElementoListaCategorias, Categoria, Valor} from './ElementosDeLista';
import Icono from '../elementos/Icono';
import FormatearCantidad from '../funciones/convertirAMoneda';

const GastosPorCategoria = () => {
   
    const gastosPorCategoria = useObtenerGastosDelMesPorCategoria();

    return (
        <>
            <Helmet>
                <title>Gastos por categoría</title>
            </Helmet>

            <Header>
                <BtnRegresar ruta='/'/>
                <Titulo>Gastos por categoría</Titulo>
            </Header>

            <ListaDeCategorias>
                {gastosPorCategoria.map((elemento, index) => {
                    return(
                        <ElementoListaCategorias key={index}>
                            <Categoria> 
                                <Icono nombre={elemento.categoria}/>
                                {elemento.categoria}
                            </Categoria>

                            <Valor>{FormatearCantidad(elemento.cantidad)}</Valor>
                        </ElementoListaCategorias>
                    );
                })}
            </ListaDeCategorias>
            

            <BarraTotalGastado />
        </>
    );
}
 
export default GastosPorCategoria;