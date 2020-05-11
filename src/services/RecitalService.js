
import API from "utils/api.js";
import { useManejadorDeErrores } from "./ManejadorDeErrores";


    const { mostrarPaginaError } = useManejadorDeErrores();
    
    export const buscarPorNombreYGenero = (busqueda) => {
        return new Promise((resolve, reject) => {
            API.get(`recitales/bandas?genero=${busqueda}`)
                .then((response) => { resolve(response.data); })
                .catch((error) => { reject(error.message) });

        });
    }

    export const traerTodos = () => {
        return new Promise((resolve, reject) => {
            API.get(`recitales`)
                .then((response) => { resolve(response.data); })
                .catch((error) => { reject(error.message) });

        });
    }

    export const buscarPorId = (id) => {
        return new Promise((resolve, reject) => {
            API.get(`recitales/${id}`)
                .then(({ data: recital }) => {
                    resolve(recital);
                })
                .catch((error) => { mostrarPaginaError(error) });

        });

    }



export const crearRecital = (recital) => {
    return new Promise((resolve, reject) => {
        API.post('recitales', { ...recital })
            .then(({ data: recital }) => { resolve(recital) })
            .catch((error) => { reject(error.message); });
    });

}
