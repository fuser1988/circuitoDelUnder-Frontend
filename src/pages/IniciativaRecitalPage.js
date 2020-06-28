import React, { useState, useContext } from "react";

import { UserContext } from "context/UserContext.js";
import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import { CardBody, Card, Container, FormText } from "reactstrap";
import { useHistory } from "react-router-dom";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import IniciativaRecitalCard from "components/card/IniciativaRecitalCard.js";
import NuevaIniciativa from "components/form/NuevaIniciativa.js"
import { useIniciativaService } from "services/IniciativaService.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toast.css';
import Spinner from "components/spinner/Spinner.js";
import Paginacion from 'components/pagination/Paginacion.js';

function IniciativaRecitalPage(props) {

    const [iniciativasDeRecitales, setIniciativasdeRecitales] = useState([]);
    const [modal, setModal] = useState(false);
    const { push } = useHistory();
    const { user } = useContext(UserContext);
    const { crearIniciativa, traerIniciativas, borrarPorId } = useIniciativaService();
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
        crearIniciativa(iniciativa)
        .then(() =>{ 
            notificar("La iniciativa se cargó correctamente");
            traerTodasLasIniciativas(1) 
        })
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

    const deleteIniciativa = (id) => {
        borrarPorId(id)
        .then(() => {
            notificar("La iniciativa se cerró correctamente");
            traerTodasLasIniciativas(activePage)
        })
        .catch((message) => { notificar(message) });
    }
    
    const toggle = () => {
        setModal(
            !modal
        );
    }

    const grillaIniciativa = () => {
        return (
            <div>
                {iniciativasDeRecitales.map((iniciativaDeRecital)=>{
                        return <IniciativaRecitalCard iniciativaDeRecital={iniciativaDeRecital} onDelete={deleteIniciativa}/>
                })}

                <div className="d-flex justify-content-center">
                    <Paginacion    
                    activePage={activePage} 
                    cantElemPorPage={itemsCountPorPage}
                    totalPages={totalPages}
                    onChangeFirst={firstClick}
                    onChangeLast={lastClick}
                    onChangePage={onChangePage}
                    >
                    </Paginacion>
                </div>
            </div>
        )
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

                    <div className="formulario-carga-banda mb-4">
                        {modal? <NuevaIniciativa
                                usuario={user.id} 
                                isOpen={modal} 
                                toggle={toggle} 
                                className={props.className}
                                onSubmit={handleSubmit}
                                />: <div></div>}

                    {cargandoIniciativa?<Spinner/>: grillaIniciativa() }
                    </div>
                    
                </Container>
            </div>
        </>
    );

}

export default IniciativaRecitalPage;