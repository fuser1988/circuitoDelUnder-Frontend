import React, { useState, useContext } from "react";

import { UserContext } from "context/UserContext.js";
import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import { CardBody, Card, Container, Button, FormGroup, FormText, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { useHistory } from "react-router-dom";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import IniciativaRecitalCard from "components/card/IniciativaRecitalCard.js";
import { AvForm, AvField } from 'availity-reactstrap-validation';

function IniciativaRecitalPage(props) {

    const [iniciativasDeRecitales, setIniciativasdeRecitales] = useState([]);
    const [modal, setModal] = useState(false);
    const { push } = useHistory();
    const { user } = useContext(UserContext);

    
    React.useEffect(() => {
        buscarIniciativaDeRecitales();
        return () => {
        }
    }, []);
    
    const buscarIniciativaDeRecitales = ()=>{
        setIniciativasdeRecitales([{
            id:1,
            descripcion:"Bunas colegas, estamos organizando una fechita en la cobacha burzaco, un bar chiquito pero amistoso, podemos tocar hasta 4 bandas, el sonido corre por cuenta de el lugar pero las bandas se encargarian del resto.",
            fecha:"2020-09-18",
            lugar:"La cobacha",
            direccion:"San martin 2235",
            localidad:"Burzaco",
            banda:{id: 3, nombre:"Bulldog",imagen:"https://www.rosarioespectacular.com/library/timthumb/timthumb.php?src=/uploadsfotos/bulldog_b3.jpg&w=300&zc=1&q=80"}
        },{
            id:2,
            descripcion:"Bunas colegas, estamos organizando una fechita en la cobacha burzaco, un bar chiquito pero amistoso, podemos tocar hasta 4 bandas, el sonido corre por cuenta de el lugar pero las bandas se encargarian del resto.",
            fecha:"2020-10-12",
            lugar:"La cobacha",
            direccion:"San martin 2235",
            localidad:"Burzaco",
            banda:{id: 2, nombre:"Explenden",imagen:"https://scontent.faep4-1.fna.fbcdn.net/v/t1.0-9/p960x960/68701583_2644002115632614_3536889436358836224_o.jpg?_nc_cat=110&_nc_sid=85a577&_nc_oc=AQlmQbSgJvUjFyjxR02XflrutiijGeyQK5cipwxQ4FMvyOjbU9gwpCfgA4TloJzYYq0&_nc_ht=scontent.faep4-1.fna&_nc_tp=6&oh=53a810b0a02ddb507521919d63115578&oe=5F19C82C"}
        }]);    
    }

    const toggle = () => {
        setModal(
            !modal
        );
    }

    return (
        <>
            <div className="page-header fondo-responsive">
                <RecitalesNavbar />
                <RecitalesHeader />
                <Container className="formulario-angosto">
                    <Card className="mt-4">
                        <CardBody>
                            <div className="row">
                                <div className="col-10">
                                    <h4 className="ml-4">Crea una inicitiva de recital para convocar bandas que se sumen a participar de un recital.</h4>
                                    <FormText color="muted" className="ml-4 mt-0">
                                        Incluí el material de tu bandaas convocar bandas que se sumen a participar de un recital dfsdfgsdfgsdg  dfgdfhdfjg hjghjghjlj,kfxgohcfiopgjhiofghpoifgughoj.
                            </FormText>
                                    <div className="col-12 d-flex justify-content-end">
                                        <a href="##" className="btn-simple btn-round btn btn-primary" onClick={toggle} >Iniciativa de recital</a>
                                    </div>
                                </div>
                                <div className="col-2 w-md-25">
                                    <img alt="..." className="" src={require("../assets/img/iniciativa.png")} />
                                </div>
                            </div>

                        </CardBody>

                    </Card>

                    <Modal isOpen={modal} toggle={toggle} className={props.className}>
                        <ModalHeader toggle={toggle}>Material</ModalHeader>
                            <ModalBody>
                                <AvForm  >
                                    <AvField type="select" name="tipoMaterial" label="Tipo">
                                        <option selected value="TIPO_VIDEO">Video</option>
                                        <option value="TIPO_ALBUM">Album</option>
                                    </AvField>
                                    <AvField name="url" label="Url" required helpMessage="Pega acá la url de tu material en Youtube" />
                                    <AvField type="textarea" name="comentario" label="Descripción" required />


                                    <FormGroup>
                                        <ModalFooter>

                                            <Button color='secondary' onClick={toggle}>cancelar</Button>
                                            <Button color='secondary'>Aceptar</Button>
                                        </ModalFooter>
                                    </FormGroup>
                                </AvForm>
                            </ModalBody>
                    </Modal>
                    {iniciativasDeRecitales.map((iniciativaDeRecital)=>{
                        return <IniciativaRecitalCard iniciativaDeRecital={iniciativaDeRecital}/>

                    })}
                        
                </Container>
            </div>
        </>
    );

}

export default IniciativaRecitalPage;