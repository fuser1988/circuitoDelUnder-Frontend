class Banda {
    nombre = '';
    info = '';
    generos = [];
    imagen = null;
    usuarioId = null;
    material = [];

    constructor(banda){
        if(banda){
            this.nombre = banda.nombre;
            this.info = banda.info;
            this.imagen = banda.imagen;
            this.usuarioId = banda.usuarioId;
            this.generos = banda.generos;
            this.material = banda.material;
        }
    }

    getGeneros(){
        return [...new Set(this.generos.map((genero)=>{return genero.nombre}))];
    }
}
export default Banda;