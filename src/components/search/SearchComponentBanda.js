import React, { useState } from 'react';
import { useHistory } from "react-router";

import { InputGroup, Col, InputGroupAddon, Input, Button,Container 
} from "reactstrap";


function SearchComponentBanda(props) {

  const [busqueda, setBusqueda] = useState("");

  const actualizarInput = (event) => {
    setBusqueda(event.target.value);
  }

  const redirecionarAPaginaDeBusqueda = () => {
    props.busqueda(busqueda);
    setBusqueda("");
  }


  const redirecionarSiPresionoEnter = (event) => {
    if (event.key === 'Enter') {
      redirecionarAPaginaDeBusqueda();
    }
  }

  return (
    <Container>
      <InputGroup>
        <Col className="resize-search offset-2 col-8 mt-4">
          <InputGroupAddon className="d-flex align-items-center" addonType="append">
            <Input className="form-control" placeholder="" type="text" value={busqueda} onChange={actualizarInput} onKeyPress={redirecionarSiPresionoEnter} ></Input>
            <Button className="btn btn-text-center" onClick={redirecionarAPaginaDeBusqueda} >
              Buscar
              </Button>
          </InputGroupAddon>
        </Col>
      </InputGroup>
    </Container >
  );


}

export default SearchComponentBanda;