import React, {useState, useContext, useEffect} from 'react';
import {auth} from '../firebase/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// creamos el contexto
const AuthContext = React.createContext();

// hook para acceder al contexto
const useAuth = () => {
    return useContext(AuthContext);
}

// componente padre que provee el estado
const AuthProvider = ({children}) => {

    const [usuario, cambiarUsuario] = useState();
    
    // state para saber cuando termina de cargar la comprobacion de onAuthStateChanged
    const [cargando, cambiarCargando] = useState(true);

    // efecto para ejecutar la comprobación una sola vez
    useEffect(() => { 
        // comprobamos si hay usuario
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false);
        });

        return cancelarSuscripcion;
    }, []);

    return ( 
        <AuthContext.Provider value={{usuario: true}}>
            {!cargando && children}
        </AuthContext.Provider>
    );
}
 
export {AuthProvider, AuthContext, useAuth};
