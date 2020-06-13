import { recitalesMock } from 'RecitalesMock'
import { recitalesPunkMock } from 'RecitalesPunkMock'

const mockRecitales = recitalesMock;
const mockRecitalesPunk = recitalesPunkMock;

export const  RecitalServiceMock  = ()=>{
    
    const buscarPorNombreYGenero = (textoBusqueda) => {
        return {
            then: (resolve) => {
                resolve(mockRecitalesPunk);
                return ({ catch: (reject) => { reject("hubo un error en el servidor") } })
            }
        }
    }
    
    const traerTodos = () => {
        return {
            then: (resolve) => {
                resolve(mockRecitales);
                return ({ catch: (reject) => { reject("hubo un error en el servidor") } })
            }
        }
    }
    return {buscarPorNombreYGenero, traerTodos}
}
