
import CircuitoDelUnderApi from "utils/CircuitoDelUnderApi.js";
import {useManejadorDeErrores} from "./ManejadorDeErrores.js";

export const useBandaService = () => {

    const {mostrarPaginaError} = useManejadorDeErrores();

    const traerTodos = () => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`banda`)
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
    return {crearBanda, traerTodos, buscarPorId }
}