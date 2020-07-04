import {useHistory} from "react-router";


export const useManejadorDeErrores = () => {
    
    const {push}= useHistory();
    
    const mostrarPaginaError = (error) => {

        if (error.response === undefined){
            push("/serverError")
        }else {
            if (error.response) {
                    
                const {status} = error.response;
                
                switch (status) {
                    case 400:
                        push("/notFound");
                        break;
                    case 403:
                        push("/notFound");
                        break;
                    case 404:
                        console.log(error.response.data);
                        break;
                    case 500:
                        push("/serverError");
                        break;
                    default:    
                        push("/serverError");
                }
            }
        }
        
    }    
    
    return {mostrarPaginaError}
    
}