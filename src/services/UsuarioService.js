
import API from "utils/api.js";
import { useManejadorDeErrores } from "./ManejadorDeErrores.js";

export const useUsuarioService = () => {

    const { mostrarPaginaError } = useManejadorDeErrores();

    const validarCodigo = (codigo) => {
        return new Promise((resolve, reject) => {
            API.post('usuario/validacion', codigo)
                .then(({ data: usuario }) => { resolve(usuario) })
                .catch((error) => { mostrarPaginaError(error) });
        });

    }

    const buscarUsuario = (referencia) => {
        return new Promise((resolve, reject) => {
            API.post('usuario/info', referencia)
                .then(({ data: respuesta }) => { resolve(respuesta) })
                .catch((error) => { mostrarPaginaError(error) });
        });

    }
    
    return { validarCodigo, buscarUsuario }
}