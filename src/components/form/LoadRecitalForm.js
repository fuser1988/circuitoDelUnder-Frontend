import RecitalService from "services/RecitalService.js";
import RowForm from "components/form/RowForm.js";
import {withRouter} from "react-router-dom";

import React  from 'react'


class LoadRecitalPage extends React.Component{
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
            generosValidos : ["PUNK","PUNK_ROCK","ROCK","HARD_ROCK","HARDCORE","HARDCORE_PUNK","ROCK_AND_ROLL","METAL","NEW_METAL","REGGAE","BLUZ"],
            isValido : true,
            isGenerosValidos: true
        };
        this.onChange=this.onChange.bind(this); 
        this.cancelar=this.cancelar.bind(this); 
        this.sendRecital=this.sendRecital.bind(this); 
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
        //modifico la lista para que se separe por comas
        const currentRecital = this.state.recital;
        this.setState({ recital: { ...currentRecital, [property]: lista.split(',') } });
    }

    async validarGeneros(lista) {
        // verifica si algunos de los generos recibido son validos
        this.setState({isGenerosValidos:true});  
        lista.map(r =>{
            if(! this.state.generosValidos.includes(r)) {
                console.log("entraalif")
                this.setState({isGenerosValidos:false});
                this.setState({ recital: { ...this.state.recital, ['generos']: [] } });
                alert("El genero ingresado es invalido");
                
            }
        })
    }

    async verificarValidacion() {
        // verifica si los datos recibidos son validos
        this.setState({isValido:true});
        const currentRecital = this.state.recital;
        if(currentRecital.nombre === ''){
            this.setState({isValido:false});
            alert("Se necesita un nombre")  
        }
        if(currentRecital.descripcion === ''){
            this.setState({isValido:false});
            alert("Se necesita una descripción")  
        }
        if(currentRecital.fecha === ''){
            this.setState({isValido:false});
            alert("Se necesita una fecha")  
        }
        if(currentRecital.hora === ''){
            this.setState({isValido:false});
            alert("Se necesita una hora")  
        }
        if(currentRecital.generos.length === 0){
            this.setState({isValido:false});
            alert("Se necesita al menos un genero valido, Ej PUNK,PUNK_ROCK,ROCK,HARD_ROCK,HARDCORE,HARDCORE_PUNK,ROCK_AND_ROLL,METAL,NEW_METAL,REGGAE,BLUZ")  
        }else{
            await this.modificarLista('generos', currentRecital.generos.toUpperCase());
        }
        if(currentRecital.direccion === ''){
            this.setState({isValido:false});
            alert("Se necesita una dirección")  
        }
        if(currentRecital.localidad === ''){
            this.setState({isValido:false});
            alert("Se necesita una localidad")  
        }
        if(currentRecital.lugar === ''){
            this.setState({isValido:false});
            alert("Se necesita un lugar")  
        }
     }
     
    async sendRecital() {
        await this.verificarValidacion();
        if(this.state.isValido){
            await this.validarGeneros(this.state.recital.generos);
            if(this.state.isGenerosValidos){
                await this.modificarLista('bandas', this.state.recital.bandas);
                console.log("aca entrooo");
                await RecitalService.crearRecital(this.state.recital);
                this.props.history.push('/');
            }
        }
    }

    cancelar() {
        this.props.history.push('/')
    }
    
    render(){
        return(
            <>
            <form  className="grilla-Responsive offset-md-2 col-10 form" >
                <RowForm
                    label='Nombre'
                    property={this.state.recital.nombre}
                    propertyName='nombre'
                    placeholder='nombre'
                    type='text'
                    accion={this.onChange}
                    />

                <RowForm
                    label='Descripcion'
                    property={this.state.recital.descripcion}
                    propertyName='descripcion'
                    placeholder='descripción'
                    type='text'
                    accion={this.onChange}
                    />

                <RowForm
                    label='Bandas'
                    property={this.state.recital.bandas}
                    propertyName='bandas'
                    placeholder='bandas ej: banda1, banda2'
                    type='text'
                    accion={this.onChange}
                    />

                <RowForm
                    label='Fecha'
                    property={this.state.recital.fecha}
                    propertyName='fecha'
                    placeholder= ''
                    type='date'
                    accion={this.onChange}
                    />

                <RowForm
                    label='Hora'
                    property={this.state.recital.hora}
                    propertyName='hora'
                    placeholder='hora'
                    type='time'
                    accion={this.onChange}
                    />

                <RowForm
                    label='generos'
                    property={this.state.recital.generos}
                    propertyName='generos'
                    placeholder='PUNK,PUNK_ROCK,ROCK,HARD_ROCK,HARDCORE,HARDCORE_PUNK,ROCK_AND_ROLL,METAL,NEW_METAL,REGGAE,BLUZ;'
                    type='text'
                    accion={this.onChange}
                    />

                <RowForm
                    label='direccion'
                    property={this.state.recital.direccion}
                    propertyName='direccion'
                    placeholder='dirección ej: calle altura'
                    type='text'
                    accion={this.onChange}
                    />

                <RowForm
                    label='localidad'
                    property={this.state.recital.localidad}
                    propertyName='localidad'
                    placeholder='localidad'
                    type='text'
                    accion={this.onChange}
                    />

                <RowForm
                    label='lugar'
                    property={this.state.recital.lugar}
                    propertyName='lugar'
                    placeholder='lugar'
                    type='text'
                    accion={this.onChange}
                    />

                <RowForm
                    label='URl Imagen'
                    property={this.state.recital.imagen}
                    propertyName='imagen'
                    placeholder='URL Imagen'
                    type='text'
                    accion={this.onChange}
                    />

                <RowForm
                    label='Precio'
                    property={this.state.recital.precio}
                    propertyName='precio'
                    placeholder=''
                    type='text'
                    accion={this.onChange}
                    />

            </form>
            <br></br>
        
            <div className="grilla-Responsive offset-md-2 col-10">
                <button className="btn btn-text-center"  onClick={this.sendRecital}>Accept</button>
                <button className="btn btn-text-center" onClick={this.cancelar}>Cancelar</button>
            </div>
            <br></br>
           </>     
        )
    }


}
export default withRouter(LoadRecitalPage);