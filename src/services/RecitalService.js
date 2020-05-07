
import API from "utils/api.js";
import API2 from "utils/api2.js";
class RecitalService {

    buscarPorNombreYGenero(busqueda) {
        return API.get(`recitales/bandas?genero=${busqueda}`)
            .then(({ data: _recitales }) => {
                return _recitales;
            }).catch(console.log("no se encontraron resultados para la busqueda: implementar un mensaje amigable"));
    }

    crearRecital(recital){
        API2.post('recitales', { ...recital })
        .then(() => this.props.history.push('/'))
        .catch(console.log);    
    }
}

export default new RecitalService();