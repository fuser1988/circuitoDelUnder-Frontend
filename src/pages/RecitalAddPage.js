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
        };
         
    }
    
    onChange(property, event) {
        const currentRecital = this.state.recital;
        this.setState({ recital: { ...currentRecital, [property]: event.target.value } });
    }

    formRow(label, property, propertyName, placeholder, type = 'text') {
        return (
          <div div className="grilla-Responsive offset-md-2 col-10" >
            <label className="col-3 col-form-label">{label}</label>
            <div className="col-9">
                <input type={type} placeholder={placeholder} className="form-control" required='true' value={property} onChange={event => this.onChange(propertyName, event)} />
            </div>
            </div>
        );
    }

    modificarLista() {
        if(this.state.recital.bandas.length != 0) {
            let newBandas = this.state.recital.bandas
            this.state.recital.bandas = newBandas.split(',')
        }

        this.state.recital.generos = this.state.recital.generos.toUpperCase();
        if(this.state.recital.generos.length != 0) {
            let newGeneros = this.state.recital.generos
            this.state.recital.generos = newGeneros.split(',')
        }
    }

    sendRecital() {
        this.modificarLista()
        API.post('recitales', { ...this.state.recital })
          .then(() => this.props.history.push('/'))
          .catch(console.log);
    }

    cancelar() {
        this.props.history.push('/')
    }

    render() {
        return (
            <>
                <RecitalesNavbar />
                <RecitalesHeader />
                <form>
                
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
                <div div div className="grilla-Responsive offset-md-2 col-10">
                    <button className="btn btn-text-center"  onClick={() => this.sendRecital()}>Accept</button>
                    <button className="btn btn-text-center" onClick={() => this.cancelar()}>Cancelar</button>
                </div>
                <br></br>
                </>
        );
    }
}

export default RecitalAddPage;