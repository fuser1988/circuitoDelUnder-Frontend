import { useRecitalService } from "services/RecitalService.js";

import RowForm from "components/form/RowForm.js";
import RowFormDoble from "components/form/RowFormDoble.js";
import { useHistory } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import React, { useState } from "react";
import Recital from "../../model/Recital";
import { Form, FormGroup, Label,Button, Row, Col } from 'reactstrap';
function LoadRecitalForm(props) {

    const { crearRecital } = useRecitalService();
    const [recital, setRecital] = useState(new Recital());
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
        setRecital({ ...currentRecital, [property]: values })
    }

    const onChange = (property, event) => {
        const currentRecital = recital;
        setRecital({ ...currentRecital, [property]: event.target.value });
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
            crearRecital(recital).then(newRecital => {
                push('/Recital/' + newRecital.id + '/' + true)
            })
        }
    }

    const cancelar = () => {
        push('/');
    }

    return (
        <>
            <Form className="mt-3 pt-4 ">

                <Row>
                    <Col md={6}>
                        <RowForm
                            label='Nombre del recital'
                            property={recital.nombre}
                            propertyName='nombre'
                            placeholder='nombre'
                            type='text'
                            invalid={recital.nombre}
                            accion={onChange}
                        />
                        <RowForm
                            label='URl Imagen'
                            property={recital.imagen}
                            propertyName='imagen'
                            placeholder='URL Imagen'
                            type='text'
                            invalid={recital.imagen}
                            accion={onChange}
                        />
                        <FormGroup className=" form form-group">
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

                    </Col>

                    <Col md={6}>
                        <div className="contenedor-imagen d-flex justify-content-center">

                            <img

                                alt="..."
                                className=""
                                // src={banda.imagen ? banda.imagen : require("../assets/img/circuitoLogo.jpg")}
                                src={require("../../assets/img/circuitoLogo.jpg")}
                            />
                        </div>
                    </Col>


                </Row>
                
                <RowForm
                    label='Descripcion'
                    property={recital.descripcion}
                    propertyName='descripcion'
                    placeholder='descripción'
                    type='textarea'
                    invalid={recital.descripcion}
                    accion={onChange}
                />

                <Row>
                    <Col md={6}>
                        <RowForm
                            label='Lugar'
                            property={recital.lugar}
                            propertyName='lugar'
                            placeholder='lugar'
                            type='text'
                            invalid={recital.lugar}
                            accion={onChange}
                        />

                        <RowForm
                            label='Dirección'
                            property={recital.direccion}
                            propertyName='direccion'
                            placeholder='dirección ej: calle altura'
                            type='text'
                            invalid={recital.direccion}
                            accion={onChange}
                        />
                    </Col>
                    <Col md={6}>
                        <RowForm
                            label='Localidad'
                            property={recital.localidad}
                            propertyName='localidad'
                            placeholder='localidad'
                            type='text'
                            invalid={recital.localidad}
                            accion={onChange}
                        />
                        <FormGroup className="form">
                            <Label className="col-3 col-form-label pl-0">Ubicar en mapa</Label>
                            <Button className="mb-0 mt-0" onClick={cancelar}>mapa</Button>
                        </FormGroup>

                    </Col>
                </Row>    

                <div className=" form form-group">
                    <div className="row">


                        <div className="col-6 form form-group mb-0">
                            <RowFormDoble
                                label='Fecha'
                                property={recital.fecha}
                                propertyName='fecha'
                                placeholder=''
                                type='date'
                                invalid={recital.fecha}
                                accion={onChange}
                            />

                        </div>


                        <div className="col-6 form form-group mb-0">

                            <RowFormDoble
                                label='Hora'
                                property={recital.hora}
                                propertyName='hora'
                                placeholder='hora'
                                type='time'
                                invalid={recital.hora}
                                accion={onChange}
                            />
                        </div>
                    </div>
                </div>


                <div className="col-sm-6 col-md-2 pl-0">
                    <RowForm
                        label='Precio'
                        property={recital.precio}
                        propertyName='precio'
                        placeholder=''
                        type='number'
                        accion={onChange}
                    />
                </div>


                <div className="pt-3 pb-4">
                    <Button   className="col-sm-12 col-md-2 ml-0 " onClick={cancelar}>Cancelar</Button>
                    <Button  className="col-sm-12 col-md-2 ml-0 ml-md-1" onClick={guardarRecital}>Aceptar</Button>
                </div>

            </Form>

        </>
    )


}
export default LoadRecitalForm;
