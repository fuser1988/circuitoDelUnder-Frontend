import React, { useState } from 'react';
import UbicacionMap from 'components/body/UbicacionMapForm.js';
import ReactDependentScript from "react-dependent-script";
import {
  Col,
  Input,
  Button,
  Container,
  Modal, 
  ModalFooter,
  ModalBody,
  UncontrolledTooltip
} from "reactstrap";
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';


function SearchBars(props) {

  const [modal, setModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const key = 'AIzaSyDAuIBs1Jon6yWwS-O7mg_1q8EH1M9jl8o';
  const [activo, setActivo] = useState(false);

  React.useEffect(() => {
        
    return () => {
        borrarDatosDeGmaps();
    }
  },[]);

  const borrarDatosDeGmaps = ()=>{
      const allScripts = document.getElementsByTagName('script');
      [].filter.call(
          allScripts,
          (scpt) => scpt.src.indexOf('key=AIzaSyDAuIBs1Jon6yWwS-O7mg_1q8EH1M9jl8o') >= 0
      )[0].remove();
      window.google = {};
  }

  const actualizarInput = (event) => {
    setActivo(false)
    setBusqueda(event.target.value);
  }

  const onChangeUbicacion = (property, event) => {
    setBusqueda("");
    props.busquedaUbicacion(event);
  }

  const redirecionarAPaginaDeBusqueda = () => {
    props.changeBusqueda(busqueda);
    setBusqueda("");
  }


  const redirecionarSiPresionoEnter = (event) => {
    if (event.key === 'Enter') {
      redirecionarAPaginaDeBusqueda();
    }
  }

  const toggle = () =>{
    if(!activo){
      setModal(!modal)
    }
    setActivo(!activo)
  }

  const cerrarToggle = () =>{
    setModal(false)
  }

  return (
    <Container id="search-component">
        <Col className="resize-search offset-2 col-8 mt-4 mb-3">
            <div className="d-flex align-items-center">
            <Input id="search-input" className="form-control" placeholder="" type="text" value={busqueda} onChange={actualizarInput} onKeyPress={redirecionarSiPresionoEnter} ></Input>
            <Button className="btn btn-text-center boton-buscar-mobile des buscar" onClick={redirecionarAPaginaDeBusqueda} >
              <div className="texto-boton-buscar">Buscar</div>
              <FaSearch className="hidden icon-search"/> 
            </Button >
              <Button id="tooltip"  className="btn btn-text-center boton-ubicacion-mobile" active={activo} outline onClick={toggle}>
                <FaMapMarkerAlt className="icon-search-map"/> 
              </Button>
              <UncontrolledTooltip placement="bottom" target="tooltip">
                  Buscar por Ubicación
              </UncontrolledTooltip>
            </div>  
              <Modal isOpen={modal} toggle={toggle} className={props.className}>
                  <ModalBody>
                  <ReactDependentScript
                      scripts={[
                          'https://maps.googleapis.com/maps/api/js?key='+key+'&libraries=places,geometry'
                      ]}
                    >
                      <UbicacionMap accion={onChangeUbicacion}/>
                  </ReactDependentScript>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='secondary' onClick={cerrarToggle}>Aceptar</Button>
                  </ModalFooter>
              </Modal>
        </Col>
    </Container >
  );


}

export default SearchBars;