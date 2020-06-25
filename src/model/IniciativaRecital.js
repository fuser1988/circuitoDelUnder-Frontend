class IniciativaRecital {
    nombre = '';
    descripcion = '';
    fecha = '';
    hora = '';
    direccion = '';
    localidad = '';
    lugar = '';
    telefono = '';
    banda = null;
    usuario = null;

    constructor(iniciativaRecital){
        if(iniciativaRecital){
            this.nombre = iniciativaRecital.nombre;
            this.descripcion = iniciativaRecital.descripcion;
            this.hora = iniciativaRecital.hora;
            this.direccion = iniciativaRecital.direccion;
            this.localidad = iniciativaRecital.localidad;
            this.lugar = iniciativaRecital.lugar;
            this.telefono = iniciativaRecital.telefono;
            this.banda = iniciativaRecital.banda;
            this.usuario = iniciativaRecital.usuario;
        }
    }
}
export default IniciativaRecital;