import { useRecitalService } from "services/RecitalService.js";

import RowForm from "components/form/RowForm.js";
import { useHistory } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import { Alert } from "reactstrap";
import React, { useState } from 'react'
import Recital from "../../model/Recital";


function LoadRecitalForm(props) {

    const { crearRecital } = useRecitalService();
    const [ recital, setRecital ] = useState( new Recital() );
    const { push } = useHistory();

    const generosValidos = ["PUNK", "PUNK_ROCK", "ROCK", "HARD_ROCK", "HARDCORE", "HARDCORE_PUNK", "ROCK_AND_ROLL", "METAL", "NEW_METAL", "REGGAE", "BLUZ"];
    let isBandasValidas = true;

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

        modificarListaGeneros('generos', values);
    }

    const modificarListaGeneros = (property, values) => {
        const currentRecital = recital;
        setRecital({ ...currentRecital, [property]: values})
    }

    const onChange = (property, event) => {
        const currentRecital = recital;
        setRecital({  ...currentRecital, [property]: event.target.value  });
    }

    const modificarListaBandas = (property, lista) => {
        //modifico la lista para que se separe por comas
        if (lista.length > 0 && isBandasValidas) {
            const currentRecital = recital;
            recital.bandas = recital.bandas.split(',');
            //setRecital({ ...currentRecital, [property]: recital.bandas.split(',') } );
            isBandasValidas= false; 
        }
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
            modificarListaBandas('bandas', recital.bandas);
            //crearRecital(recital);
            //push('/');
            console.log(recital)
            //console.log(recital.bandas.split(','))
            //console.log(JSON.stringify(recital))
        }
    }

    const cancelar = () => {
        push('/');
    }

    return (
        <>
            <form className="grilla-Responsive offset-md-2 col-10 form" >
                <RowForm
                    label='Nombre'
                    property={recital.nombre}
                    propertyName='nombre'
                    placeholder='nombre'
                    type='text'
                    accion={onChange}
                />

                <RowForm
                    label='Descripcion'
                    property={recital.descripcion}
                    propertyName='descripcion'
                    placeholder='descripción'
                    type='text'
                    accion={onChange}
                />

                <RowForm
                    label='Bandas'
                    property={recital.bandas}
                    propertyName='bandas'
                    placeholder='bandas ej: banda1, banda2'
                    type='text'
                    accion={onChange}
                />

                <RowForm
                    label='Fecha'
                    property={recital.fecha}
                    propertyName='fecha'
                    placeholder=''
                    type='date'
                    accion={onChange}
                />

                <RowForm
                    label='Hora'
                    property={recital.hora}
                    propertyName='hora'
                    placeholder='hora'
                    type='time'
                    accion={onChange}
                />

                <label className="col-6 col-form-label">Géneros</label>
                    <div className="col-9">
                        <div className='multiSelectContainer'>
                            <Multiselect
                                options={generosValidos} // Options to display in the dropdown
                                selectedValues={recital.generos} // Preselected value to persist in dropdown
                                onSelect={handleChange} // Function will trigger on select event
                                onRemove={handleChange}
                                displayValue="name" // Property name to display in the dropdown options
                                placeholder='Generos'
                                isObject={false}
                                valid={(true)}
                                />
                        </div>
                    </div>

                <RowForm
                    label='Dirección'
                    property={recital.direccion}
                    propertyName='direccion'
                    placeholder='dirección ej: calle altura'
                    type='text'
                    accion={onChange}
                />

                <RowForm
                    label='Localidad'
                    property={recital.localidad}
                    propertyName='localidad'
                    placeholder='localidad'
                    type='text'
                    accion={onChange}
                />

                <RowForm
                    label='Lugar'
                    property={recital.lugar}
                    propertyName='lugar'
                    placeholder='lugar'
                    type='text'
                    accion={onChange}
                />

                <RowForm
                    label='URl Imagen'
                    property={recital.imagen}
                    propertyName='imagen'
                    placeholder='URL Imagen'
                    type='text'
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

                <br></br>

                <button className="btn btn-text-center" onClick={guardarRecital}>Aceptar</button>
                <button className="btn btn-text-center" onClick={cancelar}>Cancelar</button>

            </form>
        </>
    )


}
export default LoadRecitalForm;