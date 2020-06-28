
import CircuitoDelUnderApi from "utils/CircuitoDelUnderApi.js";
import {useManejadorDeErrores} from "./ManejadorDeErrores.js";

export const useIniciativaService = () => {

    const {mostrarPaginaError} = useManejadorDeErrores();

    const traerIniciativas = (page, size) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`iniciativa_recitales/?page=${page}&size=${size}`)
                .then((response) => { resolve(response.data); })
                .catch(mostrarPaginaError );

        });
    }

    const crearIniciativa = (iniciativa) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.post('iniciativa_recital', iniciativa )
                .then(({ data: iniciativa }) => { resolve(iniciativa) })
                .catch((error) => { mostrarPaginaError(error) });
        });

    }

    const borrarPorId = (id) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.delete(`iniciativa_recital/${id}`)
                .then(({ data: iniciativa }) => { resolve(iniciativa) })
                .catch((error) => { mostrarPaginaError(error) });

        });
    }

    return {crearIniciativa, traerIniciativas, borrarPorId }
}