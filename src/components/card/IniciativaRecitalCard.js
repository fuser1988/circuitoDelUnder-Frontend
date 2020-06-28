import React, { useState, useContext } from "react";

import { UserContext } from "context/UserContext.js";
import { UncontrolledTooltip, Row, Col, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import { useBandaService } from "services/BandaService.js";
import moment from "moment";

function IniciativaRecitalCard(props) {

    let mensajeSolicitudDeParticipacion = `*!Saludos colega de Circuito del under¡* 🤚🏼🤟🏼 😁\nSoy integrante de ` + props.iniciativaDeRecital.banda.nombre + ` y estamos interesados en participar del recital en ` + props.iniciativaDeRecital.lugar + `.\nTe pido por favor mas detalles y te dejo el link al perfil de mi banda.\nURL_PERFIL_BANDA`;
    let apiWhatsApp = "https://api.whatsapp.com/send?";

    const { push } = useHistory();
    const { user } = useContext(UserContext);
    const traducirFecha = () => {
        var fechaDeRecital = moment(props.iniciativaDeRecital.fecha);
        moment.locale('es');
        fechaDeRecital.locale(false);
        return fechaDeRecital.format('dddd D [de] MMMM [de] YYYY');
    }

    const enviarSolicitudDeParticipacionPorWhatsapp = (event) => {

        window.open(apiWhatsApp + "phone=54" + props.iniciativaDeRecital.telefono +
            "&text=" + encodeURIComponent(crearMensajeDeSolicitud()));
    }

    const crearMensajeDeSolicitud = () => {
        return mensajeSolicitudDeParticipacion.replace("URL_PERFIL_BANDA", window.location.origin + '/banda/' + props.iniciativaDeRecital.banda.id);
    }

    const cerrarConvocatoriaDeRecital = (idDeIniciativaDeRecital) => {
        console.log("marcar iniciativa con id " + idDeIniciativaDeRecital + " como cerrada.");
    }

    return (
        <>
            <div className="formulario-carga-banda background-form  pt-4 mb-4">
                <Row>
                    <Col md="3" className="">
                        <div className="d-flex justify-content-center">
                            <img alt="..." className="" onClick={() => { push("/banda/" + props.iniciativaDeRecital.banda.id) }} src={props.iniciativaDeRecital.banda.imagen} />
                        </div>
                        <a href={"/banda/" + props.iniciativaDeRecital.banda.id} className="d-flex justify-content-center mt-2">
                            <h3 className="mb-1">{props.iniciativaDeRecital.banda.nombre}</h3>
                        </a>
                        <div className="d-flex justify-content-center mb-3">
                            {props.iniciativaDeRecital.banda.id === user.banda.id &&
                                <Button id={props.iniciativaDeRecital.id} className="btn-sm btn-warning" onClick={(event) => { cerrarConvocatoriaDeRecital(event.target.id) }}>Cerrar convocatoria</Button>
                            }
                        </div>
                    </Col>
                    <Col md="9">
                        <p color="muted" className="pb-2">
                            {props.iniciativaDeRecital.descripcion}
                        </p>
                        <div className="row d-flex justify-content-start ml-1 mt-3">
                            <span className="badge badge-primary ">Lugar</span>
                            <p className="ml-2">{props.iniciativaDeRecital.lugar + " " + props.iniciativaDeRecital.direccion + "," + props.iniciativaDeRecital.localidad}</p>
                            <span className="badge badge-info ml-3">Fecha</span>
                            <p className="ml-2">{traducirFecha()}</p>

                        </div>
                        <div className=" row d-flex align-items-center justify-content-end mt-5 mb-4 mr-5 ">

                            <div className=" row d-flex align-items-center justify-content-between">
                                <h4 className="mb-0 mr-3">Contactar:</h4>
                                <Button id="tooltip" className="btn-icon btn-round btn btn-facebook btn-sm" onClick={(event) => { enviarSolicitudDeParticipacionPorWhatsapp(event) }}>
                                    <img alt="..." className="" src={require("../../assets/img/whatsapp.png")} />
                                </Button>
                                <UncontrolledTooltip placement="bottom" target="tooltip">
                                    Envia un mensaje de whatsapp al organizador
                                </UncontrolledTooltip>
                            </div>
                            
                        </div>

                    </Col>
                </Row>

            </div>
        </>
    );

}

export default IniciativaRecitalCard;