import React, { useState } from 'react';
import UbicacionMap from 'components/body/UbicacionMapForm.js';
import ReactDependentScript from "react-dependent-script";
import {
  InputGroup,
  Col,
  InputGroupAddon,
  Input,
  Button,
  Container,
  Modal, 
  ModalFooter,
  ModalBody
} from "reactstrap";


function SearchBars(props) {

  const [modal, setModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const key = 'AIzaSyDAuIBs1Jon6yWwS-O7mg_1q8EH1M9jl8o';

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
    props.busquedaUbicacion(event, false);
    setBusqueda(event.target.value);
  }

  const onChangeUbicacion = (property, event) => {
    setBusqueda(event.latitud +" , " +event.longitud);
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
    setModal(!modal)
  }

  return (
    <Container id="search-component">
      <InputGroup>
        <Col className="resize-search offset-2 col-8 mt-4">
          <InputGroupAddon className="d-flex align-items-center" addonType="append">
            <Input id="search-input" className="form-control" placeholder="" type="text" value={busqueda} onChange={actualizarInput} onKeyPress={redirecionarSiPresionoEnter} ></Input>
            <Button className="btn btn-text-center" onClick={redirecionarAPaginaDeBusqueda} >
              Buscar
              </Button>
              <Button className="btn btn-text-center ml-1" onClick={toggle}>
                <i className="tim-icons icon-square-pin" />
              </Button>
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
                  <Button color='secondary' onClick={toggle}>Aceptar</Button>
                  </ModalFooter>
              </Modal>
          </InputGroupAddon>
        </Col>
      </InputGroup>
    </Container >
  );


}

export default SearchBars;