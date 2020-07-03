
import CircuitoDelUnderApi from "utils/CircuitoDelUnderApi.js";
import { useManejadorDeErrores } from "./ManejadorDeErrores.js";

export const useRecitalService = () => {

    const { mostrarPaginaError } = useManejadorDeErrores();

    const buscarPorNombreYGenero = (busqueda, page, size) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`recitales/bandas?genero=${busqueda}&page=${page}&size=${size}`)
                .then((response) => { resolve(response.data); })
                .catch((error) => { reject(error.response) });

        });
    }

    const traerTodos = (page, size) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`recitales/?page=${page}&size=${size}`)
                .then((response) => { resolve(response.data); })
                .catch((error) => { reject(error.response) });

        });
    }

    const buscarPorId = (id) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`recitales/${id}`)
                .then(({ data: recital }) => {
                    resolve(recital);
                })
                .catch((error) => { reject(error.response) });

        });

    }

    const buscarRecitalesporBandaId = (id) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`recitales/banda/${id}/?page=0&size=20`)
                .then(({ data: recital }) => {
                    resolve(recital);
                })
                .catch((error) => { reject(error.response) });

        });

    }

    const crearRecital = (recital) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.post('recitales', recital)
                .then(({ data: recital }) => { resolve(recital) })
                .catch((error) => { reject(error.response) });
        });

    }

    const buscarPorUbicacion = (busqueda, page, size) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.get(`recitales/ubicacion?latitud=${busqueda.latitud}&longitud=${busqueda.longitud}&page=${page}&size=${size}`)
                .then((response) => { resolve(response.data); })
                .catch((error) => { reject(error.response); });

        });

    }

    return { buscarRecitalesporBandaId, buscarPorNombreYGenero, traerTodos, buscarPorId, crearRecital, buscarPorUbicacion }

}