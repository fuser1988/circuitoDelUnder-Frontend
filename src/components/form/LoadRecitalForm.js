import { useRecitalService } from "services/RecitalService.js";

import RowForm from "components/form/RowForm.js";
import RowFormDoble from "components/form/RowFormDoble.js";
import { useHistory } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import React, { useState } from "react";
import classnames from "classnames";
import Recital from "../../model/Recital";
import { Form, FormGroup, Label,Button, Row, Col,Input,InputGroup,InputGroupAddon,InputGroupText,Modal, ModalFooter,ModalBody } from 'reactstrap';
import UbicacionMap from 'components/body/UbicacionMapForm.js';

function LoadRecitalForm(props) {

    const { crearRecital } = useRecitalService();
    const [recital, setRecital] = useState(new Recital());
    const [entradaLibre, setEntradaLibre] = useState(true);
    const [precioFocus, setPrecioFocus] = useState(false);
    const [modal, setModal] = useState(false);
    const { push } = useHistory();

    const listadoBandasSistema = props.bandas;
    let bandasSeleccionadas = [];

    React.useEffect(() => {
        
        return () => {
        }
    },[]);

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

    const onChangeUbicacion = (property, event) => {
        const currentRecital = recital;
        setRecital({ ...currentRecital, [property]: event});
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

    const entrada = ()=>{ 
        const recitalActual = recital;
        setRecital({...recitalActual, precio:0});
        setEntradaLibre(!entradaLibre);
        console.log(recital);
    }

    const toggle = () =>{
        setModal(
           !modal
        );
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
                            label='Imagen'
                            property={recital.imagen}
                            propertyName='imagen'
                            placeholder='URL de la imagen'
                            type='text'
                            invalid={recital.imagen}
                            accion={onChange}
                        />
                        <FormGroup className=" form form-group">
                            <Label className="col-3 col-form-label pl-0">Bandas</Label>
                            <div className='multiSelectContainer'>
                                <Multiselect className="mt-0"
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
                    label='Descripción'
                    property={recital.descripcion}
                    propertyName='descripcion'
                    placeholder='Hace una breve descripción del recital..'
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
                            <Button className="mb-0 mt-0" onClick={toggle}>mapa</Button>
                        </FormGroup>
                        <Modal isOpen={modal} toggle={toggle} className={props.className}>
                            <ModalBody>
                            <UbicacionMap accion={onChangeUbicacion}/>
                            </ModalBody>
                            <ModalFooter>
                            <Button color='secondary' onClick={toggle}>Aceptar</Button>
                            </ModalFooter>
                        </Modal>

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

                <Row className="pt-2 pl-3 pr-3">
                    <Col md={6} className="pl-0 pr-md-3">
                    <InputGroup className={classnames({
                            "input-group-focus": precioFocus
                        })}>

                        <Label className=" d-flex align-items-center mb-0 pr-3" >Precio de entrada
                        </Label>    
                        
                        <InputGroupAddon  className="fix-input" addonType="prepend">
                            <InputGroupText>$</InputGroupText>
                        </InputGroupAddon>
                        
                        <Input  className="col-md-12"
                            label='Precio de entrada'
                            property='precio'
                            propertyName='precio'
                            placeholder=''
                            type='number'
                            disabled={entradaLibre}
                            onFocus={e =>
                                setPrecioFocus(true)
                            }
                            onBlur={e =>
                                setPrecioFocus(false)
                            }
                            value={recital.precio}
                            onChange={(event)=>{onChange("precio",event)}}
                        />
                    </InputGroup>

                    </Col>
                    <Col md={6} className="d-flex align-items-center"> 
                    <label className="d-flex align-items-center">
                        <input  className="mr-2"
                        type="checkbox"
                        checked={entradaLibre}
                        onChange={entrada} 
                        />
                        Entrada libre
                    </label>       
                    </Col>
                </Row>    

                <div className="pt-3 pb-4">
                    <Button   className="col-sm-12 col-md-2 ml-0 " onClick={cancelar}>Cancelar</Button>
                    <Button  className="col-sm-12 col-md-2 ml-0 ml-md-1" onClick={guardarRecital}>Aceptar</Button>
                </div>

            </Form>

        </>
    )


}
export default LoadRecitalForm;
