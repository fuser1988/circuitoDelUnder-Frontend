import React, {useState, useContext} from "react";

import { UserContext } from "context/UserContext.js";
import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import {Input, Container, Row, Col, Label, Button,FormGroup, Form ,FormText,Modal, ModalFooter, ModalHeader, ModalBody} from "reactstrap";
import { Multiselect } from 'multiselect-react-dropdown';
import Banda from "../model/Banda";
import {generosValidos} from "../model/Generos";
import { useHistory } from "react-router-dom";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import TablaMateriales from "components/tablas/TablaMateriales.js";
import { useBandaService } from "services/BandaService.js";
import Material from "../model/Material";
import { AvForm, AvField } from 'availity-reactstrap-validation';


function NuevaBandaPage(props) {
    
    const [listaDeMaterial, setListaDeMaterial] = useState([new Material(), new Material()]);    
    const [banda, setBanda] = useState(new Banda());    
    const [logo, setLogo] = useState(null);
    const [values, setValues] = useState({});
    const [modal, setModal] = useState(false);    
    const { push } = useHistory();
    const { user, setUser} = useContext(UserContext);
    const { crearBanda } = useBandaService();

    React.useEffect(() => {
        let idDeUsuarioLogueado = user.id;
        const bandaParaActualizar = banda;
        setBanda({ ...bandaParaActualizar, usuarioId: idDeUsuarioLogueado });
        return () => {
        }
    },[]);
    
    const cargarImagen = (selectorFiles) => {
        toBase64(selectorFiles[0])
            .then((imagenBase64) => {
                const bandaParaActualizar = banda;
                setBanda({ ...bandaParaActualizar, imagen: imagenBase64 });
          });
          setLogo(URL.createObjectURL(selectorFiles[0]));
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
            push("/banda/" + banda.id);
            actualizarDatosDeUsuarioLogueado(banda);

        });
    }

    const actualizarDatosDeUsuarioLogueado= (banda)=>{
            setUser({...user, banda:banda, tipoUsuario:"REGISTRADO_CON_BANDA"});
    }

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {resolve(reader.result)};
        reader.onerror = error => reject(error);
      })};
    
    const quitarMaterial = (event)=>{
        event.preventDefault();
        let listaDeMaterialAModificar = [...banda.material];
        const indiceDeMaterialAQuitar = listaDeMaterial.findIndex(material=>{return material.url === event.currentTarget.parentNode.id});
        if ( indiceDeMaterialAQuitar !== -1 ) {
            listaDeMaterialAModificar.splice( indiceDeMaterialAQuitar, 1 );
        }    
        setListaDeMaterial(listaDeMaterialAModificar);
        setBanda({...banda, material:listaDeMaterialAModificar});
        console.log(banda.material);
        
    }

    const toggle = () =>{
        setModal(
           !modal
           );
        }
    
    const handleSubmit =(event, errors, valores)=> {
        if(esValido(valores)){
            toggle();
            let material = new Material(valores);
            let listaDeMaterial = banda.material;
            listaDeMaterial.push(material)
            setBanda({...banda, material:listaDeMaterial});
    
        }
        console.log(values);
    }    
    

    const esValido=(valores)=>{
        return valores.url && valores.comentario ;
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

                <Modal isOpen={modal} toggle={toggle} className={props.className}>
                    <ModalHeader toggle={toggle}>Material</ModalHeader>
                    <ModalBody>
                        <AvForm onSubmit={handleSubmit} >
                        <AvField type="select" name="tipoMaterial" label="Tipo">
                            <option selected value="TIPO_VIDEO">Video</option>
                            <option value = "TIPO_ALBUM">Album</option>
                        </AvField>
                            <AvField name="url" label="Url" required helpMessage="Pega acá la url de tu material en Youtube" />
                            <AvField type="textarea"name="comentario" label="Descripción" required />
                            
                        
                            <FormGroup>
                                <ModalFooter>
                                
                                <Button color='secondary' onClick={toggle}>cancelar</Button>
                                <Button color='secondary'>Aceptar</Button>
                                </ModalFooter>
                            </FormGroup>
                        </AvForm>
                    </ModalBody>
              </Modal> 
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
                        onChange={(e)=>{cargarImagen(e.target.files)}} />
                    </FormGroup>
                    <FormGroup>
                        <Label name="generos" for="generos">Generos</Label>
                        <Multiselect
                                options={generosValidos} // Options to display in the dropdown
                                selectedValues={banda.generos} // Preselected value to persist in dropdown
                                onSelect={agregarGenero} // Function will trigger on select event
                                onRemove={agregarGenero}
                                displayValue="genero" // Property name to display in the dropdown options
                                placeholder=''
                                isObject={false}
                                valid={(true)}
                            />
                    </FormGroup>
                    <FormText color="muted" className="pb-2">
                        Seleccioná los géneros o estilos con los que querés que tu banda
                        aparezca en las búsquedas.
                    </FormText>
                        </Col>
                    <Col md="6" className="">
                            <div className="contenedor-imagen d-flex justify-content-center">

                            <img
                                
                                alt="..."
                                className=""
                                src={logo?logo: require("../assets/img/circuitoLogo.jpg")}
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
                    placeholder="Hace una breve descripción de tu banda."
                    onChange={onChange} />
                </FormGroup>
                
                <FormGroup>
                <div className="mt-4 mb-3 d-flex justify-content-xs-between justify-content-sm-between justify-content-md-start align-items-center">
                    <Label className ="mb-0" for="material">Material</Label>
                    <Button className ="btn-sm ml-4" onClick={toggle}>+</Button>
                    <FormText color="muted" className="ml-4 mt-0">
                        Incluí el material de tu banda.
                    </FormText>
                </div>    
                
                <TablaMateriales listaDeMaterial = {banda.material} quitarMaterial = {quitarMaterial}/>
                
                </FormGroup>
                
                <div className="pt-3 pb-4">
                    <Button   className="col-sm-12 col-md-2 ml-0 " onClick={()=>{push("/")}}>Cancelar</Button>
                    <Button  className="col-sm-12 col-md-2 ml-0 ml-md-1" >Aceptar</Button>
                </div>    
            </Form>
        </div>
        </Container>
        </div>
        </>
        );
    
}

export default NuevaBandaPage;