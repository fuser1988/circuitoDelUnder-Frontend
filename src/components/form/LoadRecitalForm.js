import { useRecitalService } from "services/RecitalService.js";

import RowForm from "components/form/RowForm.js";
import RowFormDoble from "components/form/RowFormDoble.js";
import { useHistory } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import React, { useState } from "react";
import Recital from "../../model/Recital";
import {Form, FormGroup, Label} from 'reactstrap';
function LoadRecitalForm(props) {

    const { crearRecital } = useRecitalService();
    const [ recital, setRecital ] = useState( new Recital() );
    const { push } = useHistory();

    const listadoBandasSistema = props.bandas;
    let bandasSeleccionadas = [];

    const handleChange = (event) => {
        const values = event;
        const lastItem = values[values.length - 1]
        
        if (lastItem) {
            values.pop();
            const sameItem = values.find(value => value === lastItem);
            if (sameItem === undefined) {
                values.push(lastItem);
            }
        }
        
        setearRecital('bandas', values)
    }

    const setearRecital = (property, values) => {
        const currentRecital = recital;
        setRecital({ ...currentRecital, [property]: values})
    }

    const onChange = (property, event) => {
        const currentRecital = recital;
        setRecital({  ...currentRecital, [property]: event.target.value  });
    }

    const isValido = () => {
        // verifica que todos los campos esten completos
        let valid = true;
        Object.values(recital).forEach(
            (val) => (val.length === 0) && (valid = false)
        );
        return valid;
    }

    const guardarRecital = (event) => {
        event.preventDefault();
        if (isValido()) {
            console.log(recital)
            crearRecital(recital).then( newRecital => {
                push('/Recital/' + newRecital.id +'/' +true)
            })
        }
    }

    const cancelar = () => {
        push('/');
    }

    return (
        <>
            <Form className="mt-4">
                <RowForm
                    label='Nombre del recital'
                    property={recital.nombre}
                    propertyName='nombre'
                    placeholder='nombre'
                    type='text'
                    invalid = {recital.nombre}
                    accion={onChange}
                />

                <RowForm
                    label='Descripcion'
                    property={recital.descripcion}
                    propertyName='descripcion'
                    placeholder='descripción'
                    type='textarea'
                    invalid = {recital.descripcion}
                    accion={onChange}
                />

                <FormGroup className="offset-2 col-8 form form-group">
                    <Label className="col-3 col-form-label pl-0">Bandas</Label>
                        <div className='multiSelectContainer'>
                            <Multiselect 
                                options={listadoBandasSistema} // Options to display in the dropdown
                                selectedValues={bandasSeleccionadas} // Preselected value to persist in dropdown
                                onSelect={handleChange} // Function will trigger on select event
                                onRemove={handleChange}
                                displayValue="nombre" // Property name to display in the dropdown options
                                placeholder='bandas'
                            />
                        </div>
                </FormGroup>
                <div className="offset-2 col-8 form form-group">
                    <div className="row">

                    
                    <div className="col-6 form form-group">
                        <RowFormDoble
                            label='Fecha'
                            property={recital.fecha}
                            propertyName='fecha'
                            placeholder=''
                            type='date'
                            invalid = {recital.fecha}
                            accion={onChange}
                            />
                        
                    </div>

                    <div className="col-6 form form-group">
    
                        <RowFormDoble
                            label='Hora'
                            property={recital.hora}
                            propertyName='hora'
                            placeholder='hora'
                            type='time'
                            invalid = {recital.hora}
                            accion={onChange}
                        />
                    </div>
                            </div>
                </div>
                <RowForm
                    label='Dirección'
                    property={recital.direccion}
                    propertyName='direccion'
                    placeholder='dirección ej: calle altura'
                    type='text'
                    invalid = {recital.direccion}
                    accion={onChange}
                />

                <RowForm
                    label='Localidad'
                    property={recital.localidad}
                    propertyName='localidad'
                    placeholder='localidad'
                    type='text'
                    invalid = {recital.localidad}
                    accion={onChange}
                />

                <RowForm
                    label='Lugar'
                    property={recital.lugar}
                    propertyName='lugar'
                    placeholder='lugar'
                    type='text'
                    invalid = {recital.lugar}
                    accion={onChange}
                />

                <RowForm
                    label='URl Imagen'
                    property={recital.imagen}
                    propertyName='imagen'
                    placeholder='URL Imagen'
                    type='text'
                    invalid = {recital.imagen}
                    accion={onChange}
                />

                <RowForm
                    label='Precio'
                    property={recital.precio}
                    propertyName='precio'
                    placeholder=''
                    type='number'
                    accion={onChange}
                />
                <div className="offset-2 col-8 form form-group">
                    <div className="d-flex justify-content-end pb-4">
                        <button className="btn btn-text-center" onClick={cancelar}>Cancelar</button>
                        <button className="btn btn-text-center" onClick={guardarRecital}>Aceptar</button>
                    </div>
                    
                </div>    

            </Form>
        </>
    )


}
export default LoadRecitalForm;