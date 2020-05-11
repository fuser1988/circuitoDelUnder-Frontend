import React from 'react';
import {useHistory} from "react-router";

const ManejadorDeErroresContext = React.createContext();
export const useManejadorDeErrores = () => React.useContext(ManejadorDeErroresContext);

const ManejadorDeErrores = () => {
    
    const history = useHistory();
    
    const mostrarPaginaError = (error) => {
        console.log(error.message)
        history.push("/");
    }
    return {mostrarPaginaError}
    
}
export default ManejadorDeErrores;