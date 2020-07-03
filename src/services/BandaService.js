
import CircuitoDelUnderApi from "utils/CircuitoDelUnderApi.js";
import {useManejadorDeErrores} from "./ManejadorDeErrores.js";

export const useBandaService = () => {

    const {mostrarPaginaError} = useManejadorDeErrores();

    const traerTodos = (page, size) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`bandas/?page=${page}&size=${size}`)
                .then((response) => { resolve(response.data); })
                .catch((error) => { reject(error.response) } );

        });
    }

    const buscarPorId = (id) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`bandas/${id}`)
                .then(({ data: banda }) => {
                    resolve(banda);
                })
                .catch((error) => { reject(error.response) });

        });

    }

    const crearBanda = (banda) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.post('banda', banda )
                .then(({ data: banda }) => { resolve(banda) })
                .catch((error) => { reject(error.response) });
        });

    }

    const buscarPorGenero = (busqueda, page, size) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`bandas/genero?genero=${busqueda}&page=${page}&size=${size}`)
                .then(({ data: banda }) => {
                    resolve(banda);
                })
                .catch((error) => { reject(error.response) });

        });

    }

    const buscarPorNombre = (busqueda, page, size) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`bandas/banda?nombre=${busqueda}&page=${page}&size=${size}`)
                .then(({ data: banda }) => {
                    resolve(banda);
                })
                .catch((error) => { reject(error.response) });

        });

    }

    const traerTodasRef = () => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`bandasRef`)
                .then((response) => { resolve(response.data); })
                .catch((error) => { reject(error.response) });

        });
    }

    return {crearBanda, traerTodos, traerTodasRef, buscarPorId, buscarPorGenero, buscarPorNombre }
}