import {useHistory} from "react-router";


export const useManejadorDeErrores = () => {
    
    const {push}= useHistory();
    
    const mostrarPaginaError = (error) => {
        console.log(error.message)
        push("/serverError");
    }
    return {mostrarPaginaError}
    
}