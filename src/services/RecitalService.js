
import API from "utils/api.js";
import {useManejadorDeErrores} from "./ManejadorDeErrores.js";

export const useRecitalService = () => {

    const {mostrarPaginaError} = useManejadorDeErrores();

    const buscarPorNombreYGenero = (busqueda) => {
        return new Promise((resolve, reject) => {
            API.get(`recitales/bandas?genero=${busqueda}`)
                .then((response) => { resolve(response.data); })
                .catch((error) => { reject(error.message) });

        });
    }

    const traerTodos = () => {
        return new Promise((resolve, reject) => {
            API.get(`recitales`)
                .then((response) => { resolve(response.data); })
                .catch((error) => { reject(error.message) });

        });
    }

    const buscarPorId = (id) => {
        return new Promise((resolve, reject) => {
            API.get(`recitales/${id}`)
                .then(({ data: recital }) => {
                    resolve(recital);
                })
                .catch((error) => { mostrarPaginaError(error) });

        });

    }

    const crearRecital = (recital) => {
        return new Promise((resolve, reject) => {
            API.post('recitales', JSON.stringify(recital) )
                .then(({ data: recital }) => { resolve(recital) })
                .catch((error) => { reject(error.message); });
        });

    }
    return {buscarPorNombreYGenero, traerTodos, buscarPorId, crearRecital }
}