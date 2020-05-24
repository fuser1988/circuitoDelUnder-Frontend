
import CircuitoDelUnderApi from "utils/CircuitoDelUnderApi.js";
import {useManejadorDeErrores} from "./ManejadorDeErrores.js";

export const useRecitalService = () => {

    const {mostrarPaginaError} = useManejadorDeErrores();

    const buscarPorNombreYGenero = (busqueda) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`recitales/bandas?genero=${busqueda}`)
                .then((response) => { resolve(response.data); })
                .catch((error) => { mostrarPaginaError(error) });

        });
    }

    const traerTodos = () => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`recitales`)
                .then((response) => { resolve(response.data); })
                .catch((error) => { mostrarPaginaError(error) });

        });
    }

    const buscarPorId = (id) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`recitales/${id}`)
                .then(({ data: recital }) => {
                    resolve(recital);
                })
                .catch((error) => { mostrarPaginaError(error) });

        });

    }

    const crearRecital = (recital) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.post('recitales', recital )
                .then(({ data: recital }) => { resolve(recital) })
                .catch((error) => { mostrarPaginaError(error) });
        });

    }

    const traerTodasLasBandas = () => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`bandas`)
                .then((response) => { resolve(response.data); })
                .catch((error) => { mostrarPaginaError(error) });
        })
    }

    return {buscarPorNombreYGenero, traerTodos, buscarPorId, crearRecital, traerTodasLasBandas }

}