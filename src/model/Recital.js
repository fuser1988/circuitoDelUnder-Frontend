class Recital {
    nombre = '';
    descripcion = '';
    bandas = [];
    fecha = '';
    hora = '';
    direccion = '';
    localidad = '';
    lugar = '';
    imagen = '';
    precio = 0;
    ubicacion = null;

    constructor(recital){
        if(recital){
            this.nombre = recital.nombre;
            this.descripcion = recital.descripcion;
            this.bandas = recital.bandas;
            this.fecha = recital.fecha;
            this.hora = recital.hora;
            this.direccion = recital.direccion;
            this.localidad = recital.localidad;
            this.lugar = recital.lugar;
            this.imagen = recital.imagen;
            this.precio = recital.precio;
            this.ubicacion = recital.ubicacion;

        }
    }

    getGeneros(){
        let generos = this.bandas.flatMap((banda)=>{return banda.generos});
        return [...new Set(generos.map((genero)=>{return genero.nombre}))];
    }
}
export default Recital;