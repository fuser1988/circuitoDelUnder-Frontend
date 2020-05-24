import React, {useState, useContext} from "react";

import { UserContext } from "context/UserContext.js";
import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import {Input, Container, Row, Col, Label, Button,FormGroup, Form} from "reactstrap";
import { Multiselect } from 'multiselect-react-dropdown';
import Banda from "../model/Banda";
import {generosValidos} from "../model/Generos";
import { useHistory } from "react-router-dom";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import { useBandaService } from "services/BandaService.js";

function NuevaBandaPage() {
    
    const [banda, setBanda] = useState(new Banda());    
    const { push } = useHistory();
    const { user} = useContext(UserContext);
    const { crearBanda } = useBandaService();

    React.useEffect(() => {
        let idDeUsuarioLogueado = user.id;
        const bandaParaActualizar = banda;
        setBanda({ ...bandaParaActualizar, usuarioId: idDeUsuarioLogueado });
        return () => {
        }
    },[]);
    
    const previsualizarImagen = (event)=>{
        const bandaParaActualizar = banda;
        setBanda({ ...bandaParaActualizar, imagen: URL.createObjectURL(event.target.files[0]) });
    }

    const onChange = (event) => {
        const bandaParaActualizar = banda;
        setBanda({ ...bandaParaActualizar, [event.target.name]: event.target.value });
    }

    const agregarGenero = (event) => {
        const values = event;
        const lastItem = values[values.length - 1]

        if (lastItem) {
            values.pop();
            const sameItem = values.find(value => value === lastItem);
            if (sameItem === undefined) {
                values.push(lastItem);
            }
        }
        const bandaParaActualizar = banda;
        setBanda({ ...bandaParaActualizar, 'generos': values })
    }

    const enviarBanda = (event) => {
        event.preventDefault();
        crearBanda(banda).then((banda)=>{
            push("/");

        });
    }

    
    return (
        <> 
        <div
            className="page-header fondo-responsive"
           
        >
                  
            <RecitalesNavbar />
            <RecitalesHeader />
            <Container className="formulario-angosto">

                <div className="formulario-carga-banda background-form ">
         
            <Form className="mt-3 pt-4 " onSubmit={enviarBanda} autoComplete="none">
                <Row>
                    <Col md="6">
                    <FormGroup>
                        <Label for="name">Nombre de tu banda</Label>
                    <Input
                        type="text"
                        name="nombre"
                        id="nombre"
                        autoComplete="off"
                        placeholder=""
                        onChange={event => onChange(event)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Logo</Label>
                    <Input
                        type="file"
                        name="logo"
                        id="logo"
                        autoComplete="off"
                        placeholder="http://unaimaegen/logo/mibanda.jpj"
                        onChange={previsualizarImagen} />
                    </FormGroup>
                    <FormGroup>
                        <Label name="generos" for="generos">Generos</Label>
                        <Multiselect
                                options={generosValidos} // Options to display in the dropdown
                                selectedValues={banda.generos} // Preselected value to persist in dropdown
                                onSelect={agregarGenero} // Function will trigger on select event
                                onRemove={agregarGenero}
                                displayValue="genero" // Property name to display in the dropdown options
                                placeholder='Generos'
                                isObject={false}
                                valid={(true)}
                            />
                    </FormGroup>
                        </Col>
                        <Col md="6" className="">
                            <div className="contenedor-imagen d-flex justify-content-center">

                            <img
                                
                                alt="..."
                                className=""
                                src={banda.imagen?banda.imagen: require("../assets/img/circuitoLogo.jpg")}
                                />
                                </div>
                        </Col>
                </Row>
                
                <FormGroup>
                <Label for="descripcion">
                Descripción
                        
                    </Label>
                <Input type="textarea"
                    name="info"
                    id="info"
                    onChange={onChange} />
                </FormGroup>
                

                <Button className="mt-3 mb-3" >
                        Enviar
                </Button>
            </Form>
        </div>
        </Container>
        </div>
        </>
        );
    
}

export default NuevaBandaPage;