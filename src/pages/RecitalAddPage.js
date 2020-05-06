import React from "react";
import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import API from "utils/api2.js";


class RecitalAddPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recital:{
                nombre: '',
                descripcion: '',
                bandas:[],
                fecha: '',
                hora: '',
                generos: [],
                direccion: '',
                localidad: '',
                lugar: '',
                imagen:'',
                precio:0,
            },
            generosValidos : ["PUNK","PUNK_ROCK,ROCK","HARD_ROCK","HARDCORE","HARDCORE_PUNK","ROCK_AND_ROLL","METAL","NEW_METAL","REGGAE","BLUZ"],
            isValido : true
        }; 
    }
    
    onChange(property, event) {
        const currentRecital = this.state.recital;
        this.setState({ recital: { ...currentRecital, [property]: event.target.value } });
    }

    formRow(label, property, propertyName, placeholder, type = 'text') {
        return (
          <div>
            <label className="col-3 col-form-label">{label}</label>
            <div className="col-9">
                <input type={type} placeholder={placeholder} className="form-control" required value={property} onChange={event => this.onChange(propertyName, event)} />
            </div>
            </div>
        );
    }

    modificarLista(property, lista) {
        const currentRecital = this.state.recital;
        this.setState({ recital: { ...currentRecital, [property]: lista.split(',') } });
    }


    async verificarValidacion() {
        this.setState({isValido:true});
        const recital = this.state.recital;
        if(recital.nombre === ''){
            this.setState({isValido:false});
            alert("Se necesita un nombre")  
        }
        if(recital.descripcion === ''){
            this.setState({isValido:false});
            alert("Se necesita una descripción")  
        }
        if(recital.fecha === ''){
            this.setState({isValido:false});
            alert("Se necesita una fecha")  
        }
        if(recital.hora === ''){
            this.setState({isValido:false});
            alert("Se necesita una hora")  
        }
        if(recital.generos.length === 0){
            this.setState({isValido:false});
            alert("Se necesita al menos un genero valido, Ej PUNK,PUNK_ROCK,ROCK,HARD_ROCK,HARDCORE,HARDCORE_PUNK,ROCK_AND_ROLL,METAL,NEW_METAL,REGGAE,BLUZ")  
        }/*else{
            this.validarGeneros(recital)
        }*/
        if(recital.direccion === ''){
            this.setState({isValido:false});
            alert("Se necesita una dirección")  
        }
        if(recital.localidad === ''){
            this.setState({isValido:false});
            alert("Se necesita una localidad")  
        }
        if(recital.lugar === ''){
            this.setState({isValido:false});
            alert("Se necesita un lugar")  
        }
     }
     
    async sendRecital() {
        await this.verificarValidacion();
        if(this.state.isValido){
            const currentRecital = this.state.recital;
            await this.modificarLista('bandas', currentRecital.bandas);
            await this.modificarLista('generos', currentRecital.generos.toUpperCase());
        
            API.post('recitales', { ...this.state.recital })
                .then(() => this.props.history.push('/'))
                .catch(console.log);
        }
    }

    cancelar() {
        this.props.history.push('/')
    }

    render() {
        return (
            <>
                <RecitalesNavbar />
                <RecitalesHeader />
                <form  className="grilla-Responsive offset-md-2 col-10" >
                    { this.formRow('Nombre', this.state.recital.nombre, 'nombre', 'nombre') }
                    { this.formRow('Descripcion', this.state.recital.descripcion, 'descripcion', 'descripción') }
                    { this.formRow('Bandas', this.state.recital.bandas, 'bandas', 'bandas ej: banda1, banda2') }
                    { this.formRow('Fecha', this.state.recital.fecha, 'fecha', '', 'date') }
                    { this.formRow('Hora', this.state.recital.hora, 'hora', 'hora','time') }
                    { this.formRow('generos', this.state.recital.generos, 'generos', 'PUNK,PUNK_ROCK,ROCK,HARD_ROCK,HARDCORE,HARDCORE_PUNK,ROCK_AND_ROLL,METAL,NEW_METAL,REGGAE,BLUZ;') }
                    { this.formRow('direccion', this.state.recital.direccion, 'direccion', 'dirección ej: calle altura') }
                    { this.formRow('localidad', this.state.recital.localidad, 'localidad', 'localidad') }
                    { this.formRow('lugar', this.state.recital.lugar, 'lugar', 'lugar') }   
                    { this.formRow('URl Imagen', this.state.recital.imagen, 'imagen', 'URL Imagen') }
                    { this.formRow('Precio', this.state.recital.precio, 'precio') }
                </form>
                <br></br>
                
                <div className="grilla-Responsive offset-md-2 col-10">
                    <button className="btn btn-text-center"  onClick={() => this.sendRecital()}>Accept</button>
                    <button className="btn btn-text-center" onClick={() => this.cancelar()}>Cancelar</button>
                </div>
                <br></br>
                </>
        );
    }
}

export default RecitalAddPage;