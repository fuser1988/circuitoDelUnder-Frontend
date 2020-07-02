class IniciativaRecital {
    descripcion = '';
    fecha = '';
    localidad = '';
    lugar = '';
    telefono = '';
    banda = null;
    usuario = null;

    constructor(iniciativaRecital){
        if(iniciativaRecital){
            this.descripcion = iniciativaRecital.descripcion;
            this.fecha = iniciativaRecital.fecha;
            this.localidad = iniciativaRecital.localidad;
            this.lugar = iniciativaRecital.lugar;
            this.telefono = iniciativaRecital.telefono;
            this.banda = iniciativaRecital.banda;
            this.usuario = iniciativaRecital.usuario;
        }
    }
}
export default IniciativaRecital;