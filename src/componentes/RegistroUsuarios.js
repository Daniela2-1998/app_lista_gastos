import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import {Header, Titulo, ContenedorHeader} from '../elementos/Header';
import Boton from '../elementos/Boton';
import {Formulario, Input, ContenedorBoton} from '../elementos/ElementosDeFormulario';
import {ReactComponent as SvgLogin} from '../imagenes/registro.svg';
import styled from 'styled-components';
import {auth} from '../firebase/FirebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';


const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem; /* 100px */
    margin-bottom: 1.25rem; /* 20px */
`;

const RegistroUsuarios = () => {

    const navigate = useNavigate();

    const [correo, establecerCorreo] = useState('');
    const [password, establecerPassword] = useState('');
    const [password2, establecerPassword2] = useState('');

    const handleChange = (e) => {
        switch(e.target.name){
            case 'email':
                establecerCorreo(e.target.value);
                break;
            case 'password':
                establecerPassword(e.target.value);
                break;
            case 'password2':
                establecerPassword2(e.target.value);
                break;
            default: 
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // del lado del servidor
        // comprobamos validez del correo
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(! expresionRegular.test(correo)){
            console.log('Ingresa un correo válido');
            return;
        }

        // comprobacion de no dejar campos vacios
        if(correo === '' || password === '' || password2 === ''){
            console.log('Por favor completa todos los campos');
            return;
        }

        // comprobar igualdad de contraseñas
        if(password !== password2){
            console.log('Las contraseñas no coinciden');
            return;
        }


        // AUTH DE FIREBASE
        try {
            await createUserWithEmailAndPassword(auth, correo, password);
            console.log('Usuario creado con éxito');
            navigate('/');
        } catch (error) {
            let mensaje;
            switch(error.code){
                case 'auth/invalid-password':
                    mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
                break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
                break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                break;
            }
            console.log(mensaje);
        }
    }

    
    return (
        <>
            <Helmet>
                <title>Crear cuenta</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Crear cuenta</Titulo>
                    <div>
                        <Boton to='/iniciar-sesion'>Iniciar sesión</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={handleSubmit}>
                <Svg/>
                <Input
                    type='email'
                    name='email'
                    placeholder='Correo de mail'
                    value={correo}
                    onChange={handleChange}
                />
                <Input
                    type='password'
                    name='password'
                    placeholder='Contraseña'
                    value={password}
                    onChange={handleChange}
                />
                <Input
                    type='password'
                    name='password2'
                    placeholder='Repetir la contraseña'
                    value={password2}
                    onChange={handleChange}
                />
                <ContenedorBoton>
                    <Boton as="button" type='submit'>Crear cuenta</Boton>
                </ContenedorBoton>
            </Formulario>
        </>
    );
}
 
export default RegistroUsuarios;