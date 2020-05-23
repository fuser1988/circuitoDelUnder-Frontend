import React, {useState} from "react";
import InfoPage from "./InfoPage";
import LogoCircuitoUnder from "components/logos/LogoCircuitoUnder";
import IngresoCodigoBody from "../components/body/IngresoCodigoBody";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toast.css';
import RegistroExitosoBody from "../components/body/RegistroExitosoBody";

function ConfirmacionCuentaPage(props){
    const [validado, setValidado] = useState(false);
    React.useEffect(() => {
        //didMount
        return () => {
        //willdidunmounted
        }
    },[]);

    const notificarPorToast = (mensaje) => toast(mensaje, {
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
    });


    const notificarFalloDeValidacionDeCodigo = () => {
        notificarPorToast("El codígo de validacón es incorrecto, intentelo nuevamente");
    }

    const cambiarVista= ()=>{
        setValidado(true);
    }

    return(
        <div className="confirmacion-cuenta">
        <ToastContainer/>
        <InfoPage>
            <LogoCircuitoUnder/>
            {validado? <RegistroExitosoBody/>:
                <IngresoCodigoBody notificarFallo={notificarFalloDeValidacionDeCodigo} redirect={cambiarVista}/>      

            }
        </InfoPage>
        </div>
    )

} 

export default ConfirmacionCuentaPage;