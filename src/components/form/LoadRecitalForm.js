import { useRecitalService } from "services/RecitalService.js";

import RowForm from "components/form/RowForm.js";
import { useHistory } from "react-router-dom";

import { Alert } from "reactstrap";
import React, { useState } from 'react'
import Recital from "../../model/Recital";


function LoadRecitalForm(props) {

    const { crearRecital } = useRecitalService();
    const [ recital, setRecital ] = useState( new Recital() );
    const { push } = useHistory();

    const generosValidos = ["PUNK", "PUNK_ROCK", "ROCK", "HARD_ROCK", "HARDCORE", "HARDCORE_PUNK", "ROCK_AND_ROLL", "METAL", "NEW_METAL", "REGGAE", "BLUZ"];
    let isGenerosValidos = false;
    let visible = false;
    let isBandasValidas = true;

    const onDismiss = () => {
         visible= false;
    }

    const onChange = (property, event) => {
        const currentRecital = recital;
        setRecital({  ...currentRecital, [property]: event.target.value  });
    }

    const modificarLista = (property, lista) => {
        //modifico la lista para que se separe por comas
        if (lista.length > 0 && isBandasValidas) {
            const currentRecital = recital;
            setRecital({ ...currentRecital, [property]: currentRecital.bandas.split(',') } );
            isBandasValidas= false; 
        }
    }

    const hayGeneros = (property) => {
        if (recital.generos.length > 0) {
            recital.generos = recital.generos.toUpperCase();
            const currentRecital = recital;
            console.log(currentRecital.generos.split(','));
            setRecital({ ...currentRecital, [property]: currentRecital.generos.split(',')  });
            validarGeneros()
        }
    }

    const setearGeneroNoValido = (property) => {
        const currentRecital = recital;
        setRecital({ ...currentRecital, [property]: [] } );

    }

    const validarGeneros = () => {
        // verifica si algunos de los generos recibido son validos
        isGenerosValidos = true;
        const generos = recital.generos;
        generos.map(genero => {
            if (!generosValidos.includes(genero)) {
                isGenerosValidos = false;
                setearGeneroNoValido('generos');
                visible = true;
            }
        })
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
            hayGeneros('generos');
            if (isGenerosValidos) {
                console.log("los generos son validos");

                modificarLista('bandas', recital.bandas);
                console.log(recital);
                crearRecital(recital);
                push('/');
            }
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

                <RowForm
                    label='generos'
                    property={recital.generos}
                    propertyName='generos'
                    placeholder='PUNK,PUNK_ROCK,ROCK,HARD_ROCK,HARDCORE,HARDCORE_PUNK,ROCK_AND_ROLL,METAL,NEW_METAL,REGGAE,BLUZ;'
                    type='text'
                    accion={onChange}
                />

                <Alert
                    color="warning"
                    isOpen={visible}
                    toggle={onDismiss}
                >
                    <strong>El genero ingresado es invalido!</strong>
                    EJ: PUNK, PUNK_ROCK, ROCK, HARD_ROCK, HARDCORE,
                    HARDCORE_PUNK, ROCK_AND_ROLL, METAL,NEW_METAL,
                    REGGAE, BLUZ
                </Alert>

                <RowForm
                    label='direccion'
                    property={recital.direccion}
                    propertyName='direccion'
                    placeholder='dirección ej: calle altura'
                    type='text'
                    accion={onChange}
                />

                <RowForm
                    label='localidad'
                    property={recital.localidad}
                    propertyName='localidad'
                    placeholder='localidad'
                    type='text'
                    accion={onChange}
                />

                <RowForm
                    label='lugar'
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