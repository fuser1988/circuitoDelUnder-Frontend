import {useHistory} from "react-router";


export const useManejadorDeErrores = () => {
    
    const {push}= useHistory();
    
    const mostrarPaginaError = (error) => {

        if (error.response === undefined){
            push("/serverError")
        }else {
            const status = error.response.status;
            const message = error.response.data;
            switch (status) {
                case 400:
                    push("/error/"+status+"/"+message+"/BAD REQUEST");
                    break;
                case 403:
                    push("/error/"+status+"/"+message+"/FORBIDDEN");
                    break;
                case 404:
                    push("/error/"+status+"/"+message+"/NOT FOUND");
                    break;
                case 500:
                    push("/error/"+status+"/"+message+"/SERVER ERROR");
                    break;
                default:
                    push("/error/"+status+"/"+message+"/SERVER ERROR");
            }
        }
    }    
    
    return {mostrarPaginaError}
    
}