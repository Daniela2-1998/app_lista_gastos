import {useEffect, useState} from "react";
import {db} from '../firebase/FirebaseConfig';
import {useNavigate} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";

const useObtenerGasto = (id) => {

    const navigate = useNavigate();
    const [gasto, estableceGasto] = useState('');

    useEffect(() => { 

        const obtenerGasto = async() => { 
            const documento = await getDoc(doc(db, 'gastos', id));
            
            if(documento.exists){
                estableceGasto(documento); 
            } else {
                navigate('/lista');
            }

        }
       
        obtenerGasto();

    }, [navigate, id]); 

    return [gasto];
}
 
export default useObtenerGasto;