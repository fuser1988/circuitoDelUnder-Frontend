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
            isGenerosValidos: false,
            isBandasValidas: true
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

    async modificarLista(property, lista) {
        //modifico la lista para que se separe por comas
        if(lista.length > 0 && this.state.isBandasValidas){
        const currentRecital = this.state.recital;
        this.setState({ recital: { ...currentRecital, [property]: currentRecital.bandas.split(',') } });
        this.setState({isBandasValidas: false})
        }
    }

    async hayGeneros(property) {
        if(this.state.recital.generos.length > 0){
            this.state.recital.generos = this.state.recital.generos.toUpperCase();
            const currentRecital = this.state.recital;
            await this.setState({ recital: { ...currentRecital, [property]: currentRecital.generos.split(',') } });
            this.validarGeneros()
        }
    }

    setearGeneroNoValido(property) {
        const currentRecital = this.state.recital;
        this.setState({ recital: { ...currentRecital, [property]: [] } });
                
    }

    async validarGeneros() {
        // verifica si algunos de los generos recibido son validos
        this.setState({isGenerosValidos:true});  
        let lista = this.state.recital.generos;
        lista.map(r =>{
            if(! this.state.generosValidos.includes(r)) {
                this.setState({isGenerosValidos:false});
                this.setearGeneroNoValido('generos');
                alert("El genero ingresado es invalido, EJ: PUNK, PUNK_ROCK, ROCK, HARD_ROCK, HARDCORE, HARDCORE_PUNK, ROCK_AND_ROLL, METAL,NEW_METAL, REGGAE, BLUZ");      
            }
        })
    }

    isValido() {
    // verifica que todos los campos esten completos
        let valid = true;
        Object.values(this.state.recital).forEach(
            (val) => (val.length === 0) && (valid = false)
        );
        return valid;
    }
     
    async sendRecital() {
        if(this.isValido()){
            await this.modificarLista('bandas', this.state.recital.bandas);
            await this.hayGeneros('generos');
            if(this.state.isGenerosValidos){
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

                <br></br>
                
                <button className="btn btn-text-center"  onClick={this.sendRecital}>Accept</button>
                <button className="btn btn-text-center" onClick={this.cancelar}>Cancelar</button>
           
            </form>
           </>     
        )
    }


}
export default withRouter(LoadRecitalPage);