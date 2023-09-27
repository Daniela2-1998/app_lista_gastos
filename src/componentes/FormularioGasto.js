import React, {useState} from 'react';
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from '../elementos/ElementosDeFormulario';
import Boton from '../elementos/Boton';
import {ReactComponent as IconoPlus} from '../imagenes/plus.svg';

const FormularioGasto = () => {

    const [inputDescripcion, cambiarInputDescripcion] = useState('');
    const [inputCantidad, cambiarInputCantidad] = useState('');

    const handleChange = (e) => {
        if(e.target.name === 'descripcion'){
            cambiarInputDescripcion(e.target.value);
        } else {
            // si es algo diferente a numeros, queda vacio
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }


    return (  
        <Formulario>
            <ContenedorFiltros>
                <p>Select</p>
                <p>Date Picker</p>
            </ContenedorFiltros>

            <div>
                <Input
                    type='text' 
                    name='descripcion'
                    id='descripcion'
                    placeholder='Descripción'
                    value={inputDescripcion}
                    onChange={handleChange}
                />
                <InputGrande 
                    type='text'
                    name='valor'
                    id='valor'
                    placeholder='$0.00'
                    value={inputCantidad}
                    onChange={handleChange}
                />
            </div>

            <ContenedorBoton>
                <Boton as="button" primario conIcono> 
                    Agregar gasto
                    <IconoPlus />
                </Boton>
            </ContenedorBoton>
        </Formulario>
    );
}
 
export default FormularioGasto;