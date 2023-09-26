import React from 'react';
import {useAuth} from '../contextos/AuthContext';
import {Navigate} from 'react-router-dom';

// ruta para los usuarios que iniciaron sesión
const RutaProtegida = ({children}) => {
    const {usuario} = useAuth();

    if(usuario){
        return children;
    } else {
        return <Navigate to="/iniciar-sesion" />
    }
}
 
export default RutaProtegida;