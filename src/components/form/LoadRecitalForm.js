import RecitalService from "services/RecitalService.js";
import RowForm from "components/form/RowForm.js";
import { withRouter } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import { Alert } from "reactstrap";
import React from 'react'


class LoadRecitalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recital: {
                nombre: '',
                descripcion: '',
                bandas: [],
                fecha: '',
                hora: '',
                generos: [],
                direccion: '',
                localidad: '',
                lugar: '',
                imagen: '',
                precio: 0,
            },
            generosValidos: ["PUNK", "PUNK_ROCK", "ROCK", "HARD_ROCK", "HARDCORE", "HARDCORE_PUNK", "ROCK_AND_ROLL", "METAL", "NEW_METAL", "REGGAE", "BLUZ"],
            isGenerosValidos: false,
            visible: false,
            isBandasValidas: true
        };
        this.onChange = this.onChange.bind(this);
        this.cancelar = this.cancelar.bind(this);
        this.sendRecital = this.sendRecital.bind(this);
    }

    handleChange = (event) => {
        const values = event;
        const lastItem = values[values.length - 1]
        
        if (lastItem) {
            values.pop();
            const sameItem = values.find(value => value === lastItem);
            if (sameItem === undefined) {
                values.push(lastItem);
            }
        }

     //   const currentRecital = this.state.recital;
        this.modificarListaGeneros('generos', values);
       // this.setState({ recital: { ...currentRecital, ['generos']: values } });
        console.log(this.state.recital.generos)
    }
    async modificarListaGeneros(property, values) {
        const currentRecital = this.state.recital;
        await this.setState({ recital: { ... currentRecital, [property]: values}})
    }

    onDismiss = () => {
        this.setState({ visible: false });
    }

    onChange(property, event) {
        const currentRecital = this.state.recital;
        this.setState({ recital: { ...currentRecital, [property]: event.target.value } });
    }

    async modificarListaBandas(property, lista) {
        //modifico la lista para que se separe por comas
        if (lista.length > 0 && this.state.isBandasValidas) {
            const currentRecital = this.state.recital;
            this.setState({ 
                recital: { ...currentRecital, [property]: currentRecital.bandas.split(',')},
                isBandasValidas: false 
            });
        }
    }

    async hayGeneros(property) {
        return (this.state.recital.generos.length > 0) 
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
        if (this.isValido()) {
            await this.modificarListaBandas('bandas', this.state.recital.bandas);
            await RecitalService.crearRecital(this.state.recital);
            this.props.history.push('/');
        }
    }

    cancelar() {
        this.props.history.push('/')
    }

    render() {
        return (
            <>
                <form className="grilla-Responsive offset-md-2 col-10 form" >
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
                        placeholder=''
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

                    <label className="col-6 col-form-label">Generos</label>
                    <div className="col-9">
                        <div className='multiSelectContainer'>
                            <Multiselect
                                options={this.state.generosValidos} // Options to display in the dropdown
                                selectedValues={this.state.recital.generos} // Preselected value to persist in dropdown
                                onSelect={this.handleChange} // Function will trigger on select event
                                onRemove={this.handleChange}
                                displayValue="name" // Property name to display in the dropdown options
                                placeholder='Generos'
                                isObject={false}
                                valid={(true)}
                            />
                        </div>
                    </div>

                    <RowForm
                        label='Direccion'
                        property={this.state.recital.direccion}
                        propertyName='direccion'
                        placeholder='dirección ej: calle altura'
                        type='text'
                        accion={this.onChange}
                    />

                    <RowForm
                        label='Localidad'
                        property={this.state.recital.localidad}
                        propertyName='localidad'
                        placeholder='localidad'
                        type='text'
                        accion={this.onChange}
                    />

                    <RowForm
                        label='Lugar'
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
                        type='number'
                        accion={this.onChange}
                    />

                    <br></br>

                    <button className="btn btn-text-center" onClick={this.sendRecital}>Accept</button>
                    <button className="btn btn-text-center" onClick={this.cancelar}>Cancelar</button>

                </form>
            </>
        )
    }


}
export default withRouter(LoadRecitalPage);