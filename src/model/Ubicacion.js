class Ubicacion {
    latitud;
    longitud;

    constructor(ubicacion){
        if(ubicacion){
            this.latitud = ubicacion.latitud;
            this.longitud = ubicacion.longitud;
        }
    }
}
export default Ubicacion;