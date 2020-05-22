import { useRecitalService } from "services/RecitalService.js";

import RowForm from "components/form/RowForm.js";
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
            <Form>
                <RowForm
                    label='Nombre'
                    property={recital.nombre}
                    propertyName='nombre'
                    placeholder='nombre'
                    type='text'
                    invalid = {true}
                    accion={onChange}
                />

                <RowForm
                    label='Descripcion'
                    property={recital.descripcion}
                    propertyName='descripcion'
                    placeholder='descripción'
                    type='text'
                    invalid = {true}
                    accion={onChange}
                />

                <FormGroup className="grilla-Responsive offset-md-2 col-10 form">
                    <Label className="col-3 col-form-label">Bandas</Label>
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

                <RowForm
                    label='Fecha'
                    property={recital.fecha}
                    propertyName='fecha'
                    placeholder=''
                    type='date'
                    invalid = {true}
                    accion={onChange}
                />

                <RowForm
                    label='Hora'
                    property={recital.hora}
                    propertyName='hora'
                    placeholder='hora'
                    type='time'
                    invalid = {true}
                    accion={onChange}
                />
                
                <RowForm
                    label='Dirección'
                    property={recital.direccion}
                    propertyName='direccion'
                    placeholder='dirección ej: calle altura'
                    type='text'
                    invalid = {true}
                    accion={onChange}
                />

                <RowForm
                    label='Localidad'
                    property={recital.localidad}
                    propertyName='localidad'
                    placeholder='localidad'
                    type='text'
                    invalid = {true}
                    accion={onChange}
                />

                <RowForm
                    label='Lugar'
                    property={recital.lugar}
                    propertyName='lugar'
                    placeholder='lugar'
                    type='text'
                    invalid = {true}
                    accion={onChange}
                />

                <RowForm
                    label='URl Imagen'
                    property={recital.imagen}
                    propertyName='imagen'
                    placeholder='URL Imagen'
                    type='text'
                    invalid = {true}
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

                <div className="grilla-Responsive offset-md-2 col-10 form">
                    <button className="btn btn-text-center" onClick={guardarRecital}>Aceptar</button>
                    <button className="btn btn-text-center" onClick={cancelar}>Cancelar</button>
                </div>

            </Form>
        </>
    )


}
export default LoadRecitalForm;