
class Material {
    id="";
    comentario = 'Las palabras y los rios';
    url = 'ww.youtube/dfsdf/asda.com';
    tipoMaterial = 'TIPO_VIDEO';

    constructor(material){
        if(material){
            this.comentario = material.comentario;
            this.url = material.url;
            this.tipoMaterial = material.tipoMaterial || 'TIPO_VIDEO';

        }
    }
}
export default Material;