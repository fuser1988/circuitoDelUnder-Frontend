import React, { useState, useContext } from "react";

import { UserContext } from "context/UserContext.js";
import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import { CardBody, Card, Container, Button, FormGroup, FormText, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { useHistory } from "react-router-dom";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import IniciativaRecitalCard from "components/card/IniciativaRecitalCard.js";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import NuevaIniciativa from "components/form/NuevaIniciativa.js"
import { useIniciativaService } from "services/IniciativaService.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toast.css';
import Spinner from "components/spinner/Spinner.js";
import Paginacion from 'components/pagination/Paginacion.js';
import IniciativaRecital from "../model/IniciativaRecital.js";

function IniciativaRecitalPage(props) {

    const [iniciativasDeRecitales, setIniciativasdeRecitales] = useState([]);
    const [modal, setModal] = useState(false);
    const { push } = useHistory();
    const { user } = useContext(UserContext);
    const { crearIniciativa, traerIniciativas } = useIniciativaService();
    const [cargandoIniciativa,setCargandoIniciativa] = useState(true);
    const [activePage, setActivePage] = useState(1);
    const [itemsCountPorPage] = useState(9);
    const [totalPages, setTotalPages] = useState(0);

    React.useEffect(() => {
        traerTodasLasIniciativas(1)
        return () => {
        }
    }, []);

    const notificar = (mensaje) => toast(mensaje, {
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
    });

    const handleSubmit = (iniciativa) => {
        toggle();
        crearIniciativa(iniciativa);
        traerTodasLasIniciativas(1);
        /*let material = new Material(valores);
        let listaDeMaterial = banda.material;
        listaDeMaterial.push(material)
        setBanda({ ...banda, material: listaDeMaterial });*/

    }

    const traerTodasLasIniciativas = (page) => {
        traerIniciativas((page - 1), itemsCountPorPage)
        .then((response) => {
            setIniciativasdeRecitales(response.content);
            setTotalPages(response.totalPages);
            setCargandoIniciativa(false);
        })
        .catch((message) => { notificar(message) });
    }
    
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

    const handlePageChange = (event) => {
        setActivePage(event);
        traerTodasLasIniciativas(event);
    }

    const firstClick = () => {
        setActivePage(1);
        handlePageChange(1);
        
    }

    const lastClick = (lastPage) => {
        setActivePage(lastPage);
        handlePageChange(lastPage);
        
    }

    const onChangePage = (page) => {
        handlePageChange(page)
        setActivePage(page)
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

                    <div className="formulario-carga-banda background-form  mb-4">
                        {modal? <NuevaIniciativa
                                usuario={user.Id} 
                                isOpen={modal} 
                                toggle={toggle} 
                                className={props.className}
                                onSubmit={handleSubmit}
                                />: <div></div>}

                    {iniciativasDeRecitales.map((iniciativaDeRecital)=>{
                        return <IniciativaRecitalCard iniciativaDeRecital={iniciativaDeRecital}/>

                    })}
                    </div>
                </Container>
            </div>
        </>
    );

}

export default IniciativaRecitalPage;