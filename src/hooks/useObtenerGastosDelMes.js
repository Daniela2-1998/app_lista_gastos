import {useState, useEffect} from "react";
import {db} from '../firebase/FirebaseConfig';
import { endOfMonth, getUnixTime, startOfMonth } from "date-fns";
import { onSnapshot, where, orderBy, collection, query } from "firebase/firestore";
import {useAuth} from '../contextos/AuthContext';

const useObtenerGastosDelMes = () => {
 
    const [gastos, establecerGastos] = useState([]);
    const {usuario} = useAuth();

    useEffect(() => {

        const inicioDeMes = getUnixTime(startOfMonth(new Date()));
        const finDeMes = getUnixTime(endOfMonth(new Date()));


        if (usuario) {

            const consulta = query(
                collection(db, 'gastos'),
                orderBy('fecha', 'desc'),
                where('fecha', '>=', inicioDeMes),
                where('fecha', '<=', finDeMes),
                where('uidUsuario', '==', usuario.uid)
            );

            const unsuscribe = onSnapshot(consulta, (snapshot) => {
                establecerGastos(snapshot.docs.map((documento) => {
                    return { ...documento.data(), id: documento.id }
                }));
            }, (error)  => {console.log(error)})
            return unsuscribe;
        }
    }, [usuario]);

    return [gastos];
}

 
export default useObtenerGastosDelMes;