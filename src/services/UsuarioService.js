
import CircuitoDelUnderApi from "utils/CircuitoDelUnderApi.js";
import { useManejadorDeErrores } from "./ManejadorDeErrores.js";

export const useUsuarioService = () => {

    const { mostrarPaginaError } = useManejadorDeErrores();

    const validarCodigoCuenta = (codigo) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.post('usuario/validacion', codigo)
                .then(({ data: usuario }) => { resolve(usuario) })
                .catch((error) => { mostrarPaginaError(error) });
        });

    }

    const buscarUsuario = (referencia) => {
        return new Promise((resolve, reject) => {
            CircuitoDelUnderApi.post('usuario/info', referencia)
                .then(({ data: respuesta }) => { resolve(respuesta) })
                .catch((error) => { mostrarPaginaError(error) });
        });

    }
    
    return { validarCodigoCuenta, buscarUsuario }
}