
import CircuitoDelUnderApi from "utils/CircuitoDelUnderApi.js";
import {useManejadorDeErrores} from "./ManejadorDeErrores.js";

export const useBandaService = () => {

    const {mostrarPaginaError} = useManejadorDeErrores();

    const traerTodos = () => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`bandas`)
                .then((response) => { resolve(response.data); })
                .catch((error) => { mostrarPaginaError(error) });

        });
    }

    const buscarPorId = (id) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`banda/${id}`)
                .then(({ data: banda }) => {
                    resolve(banda);
                })
                .catch((error) => { mostrarPaginaError(error) });

        });

    }

    const crearBanda = (banda) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.post('banda', banda )
                .then(({ data: banda }) => { resolve(banda) })
                .catch((error) => { mostrarPaginaError(error) });
        });

    }

    const buscarPorGenero = (busqueda) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`bandas/genero?genero=${busqueda}`)
                .then(({ data: banda }) => {
                    resolve(banda);
                })
                .catch((error) => { mostrarPaginaError(error) });

        });

    }

    const buscarPorNombre = (busqueda) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`bandas/banda?nombre=${busqueda}`)
                .then(({ data: banda }) => {
                    resolve(banda);
                })
                .catch((error) => { mostrarPaginaError(error) });

        });

    }

    const traerTodasRef = () => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`bandasRef`)
                .then((response) => { resolve(response.data); })
                .catch((error) => { mostrarPaginaError(error) });

        });
    }

    return {crearBanda, traerTodos, traerTodasRef, buscarPorId, buscarPorGenero, buscarPorNombre }
}