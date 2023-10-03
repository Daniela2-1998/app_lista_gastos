import React, {useState} from 'react';
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from '../elementos/ElementosDeFormulario';
import Boton from '../elementos/Boton';
import {ReactComponent as IconoPlus} from '../imagenes/plus.svg';
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import agregarGasto from '../firebase/agregarGasto';
import getUnixTime from 'date-fns/getUnixTime';
import fromUnixTime from 'date-fns/fromUnixTime';
import {useAuth} from '../contextos/AuthContext';
import Alerta from '../componentes/Alerta';

const FormularioGasto = () => {

    const [inputDescripcion, cambiarInputDescripcion] = useState('');
    const [inputCantidad, cambiarInputCantidad] = useState('');

    // estado de las categorías de SelectCategorias.js
    const [categoria, cambiarCategoria] = useState('hogar');

    // estado para el DayPicker
    const [fecha, cambiarFecha] = useState(new Date());

    // obtener usuario
    const {usuario} = useAuth();

    // alertas
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
        if(e.target.name === 'descripcion'){
            cambiarInputDescripcion(e.target.value);
        } else {
            // si es algo diferente a numeros, queda vacio
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }


    
    const handleSubmit = (e) => {
        e.preventDefault();

        let cantidad = parseFloat(inputCantidad).toFixed(2);
        
        // comprobación de que haya descripción y valor
        if (inputDescripcion !== '' && inputCantidad !== '') {

            if (cantidad) {
                agregarGasto({
                    categoria: categoria,
                    descripcion: inputDescripcion,
                    cantidad: cantidad,
                    fecha: getUnixTime(fecha),
                    uidUsuario: usuario.uid
                })
                // devuelve la promesa de la función agregar gasto
                // reiniciamos valores
                .then(() => {
                    cambiarCategoria('hogar');
                    cambiarInputDescripcion('');
                    cambiarInputCantidad('');
                    cambiarFecha(new Date());

                    cambiarEstadoAlerta(true);
                    cambiarAlerta({ tipo: 'exito', mensaje: 'El gasto se agregó correctamente.' });
                })
                .catch((error) => {
                    cambiarEstadoAlerta(true);
                    cambiarAlerta({ tipo: 'error', mensaje: 'Hubo un problema al intentar agregar tu gasto.' });
                    console.log(error);
                });

            } else {
                cambiarEstadoAlerta(true);
                cambiarAlerta({ tipo: 'error', mensaje: 'El valor ingresado no es correcto.' });
            }

        } else {
            cambiarEstadoAlerta(true);
            cambiarAlerta({ tipo: 'error', mensaje: 'Por favor completa todos los campos.' });
        }
        

    }

    return (  
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias
                    categoria={categoria}
                    cambiarCategoria={cambiarCategoria}
                />
                <DatePicker
                    fecha={fecha}
                    cambiarFecha={cambiarFecha}
                />
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
                <Boton as="button"> 
                    Agregar gasto
                    <IconoPlus />
                </Boton>
            </ContenedorBoton>
            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </Formulario>
    );
}
 
export default FormularioGasto;
