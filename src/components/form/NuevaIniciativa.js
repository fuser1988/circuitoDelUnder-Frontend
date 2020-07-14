import React, { useState, useContext } from "react";
import { Button, FormGroup, Modal, Label, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
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
                        <AvGroup>
                            <Label>Descripción</Label>
                            <AvInput type="textarea" name="descripcion" required />
                            <AvFeedback>Es necesario Completar este campo</AvFeedback>
                        </AvGroup>
                        <div className=" form form-group">
                                <div className="row">
                                    <div className="col-6 form form-group mb-0">
                                        <AvGroup>
                                            <Label>Lugar</Label>
                                            <AvInput name="lugar" required />
                                            <AvFeedback>Es necesario Completar este campo</AvFeedback>
                                        </AvGroup>
                                    </div>
                                    <div className="col-6 form form-group mb-0">
                                        <AvGroup>
                                            <Label>Localidad</Label>
                                            <AvInput name="localidad" required />
                                            <AvFeedback>Es necesario Completar este campo</AvFeedback>
                                        </AvGroup>
                                    </div>
                                </div>
                        </div>
                            <div className=" form form-group">
                                <div className="row">
                                    <div className="col-6 form form-group mb-0">
                                        <AvGroup>
                                            <Label>Fecha</Label>
                                            <AvInput type="date" name="fecha" required />
                                            <AvFeedback>Es necesario Completar este campo</AvFeedback>
                                        </AvGroup>
                                    </div>
                                    <div className="col-6 form form-group mb-0">
                                        <AvGroup>
                                            <Label>Telefono</Label>
                                            <AvInput type="telephoneProp" name="telefono" required />
                                            <AvFeedback>Es necesario Completar este campo</AvFeedback>
                                        </AvGroup>
                                    </div>
                                </div>
                            </div>
                            <FormGroup>
                                <div className="d-flex justify-content-end mt-4">
                                    <Button color='danger' onClick={toggle}>Cancelar</Button>
                                    <Button color='secondary' onSubmit={handleSubmit}>Aceptar</Button>
                                </div>
                            </FormGroup>
                        </AvForm>
                    </ModalBody>    
            </Modal>
        </div>
    )
}
export default NuevaIniciativa;