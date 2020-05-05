
import API from "utils/api.js";

class RecitalService {

    buscarPorNombreYGenero(busqueda) {
        return API.get(`recitales/bandas?genero=${busqueda}`)
            .then(({ data: _recitales }) => {
                return _recitales;
            }).catch(console.log("no se encontraron resultados para la busqueda: implementar un mensaje amigable"));
    }
    
    buscarPorId(id) {
        return API.get(`recitales/${id}`)
            .then(({ data: _recital }) => {
                return _recital;
            }).catch(console.log("no se encontraron resultado para la busqueda: implementar un mensaje amigable"));
    }
}

export default new RecitalService();