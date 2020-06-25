import React, { useState } from "react";
import { Button, FormGroup, Modal, Label, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { useBandaService } from "services/BandaService.js";
import IniciativaRecital from "../../model/IniciativaRecital.js";

function NuevaIniciativa(props) {

    const [modal] = useState(props.isOpen);
    const [className] = useState(props.className);
    const [banda, setBanda] = useState([]);
    const { bandaPorUsuarioId } = useBandaService();
    const [ iniciativaRecital, setIniciativaRecital] = useState(new IniciativaRecital());

    React.useEffect(() => {
        obtenerBanda()
        return () => {
        }
    }, []);

    const obtenerBanda = () => {
        bandaPorUsuarioId().then((bandaId) =>{ setBanda(bandaId)})
    }

    const handleSubmit = (event, errors, valores) => {
        if (esValido(valores)) {
            let iniciativa = new IniciativaRecital(valores);
            setIniciativaRecital({ ...iniciativa, banda: banda})
            props.onSubmit(iniciativa);
        }
    }

    const esValido = (valores) => {
        let valid = true;
        Object.values(valores).forEach(
            (valor) => (valor.length === 0) && (valid = false)
        )
        return valid;
    }

    const toggle = () => {
        props.toggle()
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Nueva Iniciativa</ModalHeader>
                    <ModalBody>
                        <AvForm onSubmit={handleSubmit} >
                            <AvField type="text" name="nombre" label="Nombre" required />
                            <AvField type="textarea" name="descripcion" label="Descripción" required />
                            <AvField type="text" name="localidad" label="Localidad" required />
                            <AvField type="text" name="direccion" label="Dirección" required />
                            <AvField type="text" name="lugar" label="Lugar" required />
                            
                            <AvField type="date" name="fecha" label="Fecha" required />
                            <AvField type="time" name="hora" label="Hora" required />
                            <AvField type="number" name="phone" label="Telefono" required />
                            
                            <Label>Banda</Label>
                            <Label>{banda.nombre}</Label>

                            <FormGroup>
                                <ModalFooter>

                                    <Button color='secondary' onClick={toggle}>cancelar</Button>
                                    <Button color='secondary' onSubmit={handleSubmit}>Aceptar</Button>
                                </ModalFooter>
                            </FormGroup>
                        </AvForm>
                    </ModalBody>    
            </Modal>
        </div>
    )
}
export default NuevaIniciativa;