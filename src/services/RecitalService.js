
import API from "utils/api.js";

class RecitalService {

    buscarPorNombreYGenero(busqueda) {
        return API.get(`recitales/bandas?genero=${busqueda}`)
            .then(({ data: _recitales }) => {
                return _recitales;
            }).catch(console.log("no se encontraron resultados para la busqueda: implementar un mensaje amigable"));
    }

    /*newRecital(recital) {
        return API.post(`recitales/`, {
            method: 'POST',
            body: recital,
            });
    }*/
}

export default new RecitalService();