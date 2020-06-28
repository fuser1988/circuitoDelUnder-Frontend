import React, { useState, useContext } from "react";
import { Button, FormGroup, Modal, Label, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import IniciativaRecital from "../../model/IniciativaRecital.js";
import { UserContext } from "context/UserContext.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../toast.css';

function NuevaIniciativa(props) {

    const [modal] = useState(props.isOpen);
    const [className] = useState(props.className);
    const { user } = useContext(UserContext);
    const [ iniciativaRecital, setIniciativaRecital] = useState(new IniciativaRecital());

    React.useEffect(() => {
        return () => {
        }
    }, []);

    const notificar = (mensaje) => toast(mensaje, {
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
    });

    const handleSubmit = (event, errors, valores) => {
        if (esValido(valores)) {
            let iniciativa = new IniciativaRecital(valores);
            iniciativa.banda = {id: user.banda.id, usuarioId: user.id};
            setIniciativaRecital(iniciativa)
            props.onSubmit(iniciativa);
        }
    }

    const esValido = (valores) => {
        if (user.banda == null) {
            notificar("Para crear una iniciativa debe crear una banda")
        }
        
        let valid = true;
        Object.values(valores).forEach(
            (valor) => (valor.length === 0) && (valid = false)
        )
        return valid && user.banda !== null;
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
                            <AvField type="textarea" name="descripcion" label="Descripción" required />
                            <AvField type="text" name="localidad" label="Localidad" required />
                            <AvField type="text" name="direccion" label="Dirección" required />
                            <AvField type="text" name="lugar" label="Lugar" required />
                            
                            <AvField type="date" name="fecha" label="Fecha" required />
                            <AvField type="time" name="hora" label="Hora" required />
                            <AvField type="telephoneProp" name="telefono" label="Telefono" required />
                            
                            <Label>Banda</Label>
                            <br></br>
                            {user.banda === null? <Label>Debe crear una banda</Label>:<Label>{user.banda.nombre}</Label>}

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