import React from "react";
import InfoPage from "./InfoPage";
import LogoCircuitoUnder from "components/logos/LogoCircuitoUnder";
import IngresoCodigoBody from "../components/body/IngresoCodigoBody";

function ConfirmacionCuentaPage(props){
  
    React.useEffect(() => {
        //didMount
        return () => {
        //willdidunmounted
        }
    },[]);

    return(
        <div className="confirmacion-cuenta">
        <InfoPage>
            <LogoCircuitoUnder/>
            <IngresoCodigoBody/>      
        </InfoPage>
        </div>
    )

} 

export default ConfirmacionCuentaPage;