import React, { useState, useContext } from "react";

import { UserContext } from "context/UserContext.js";
import { UncontrolledTooltip, Row, Col, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import { useBandaService } from "services/BandaService.js";
import moment from "moment";

function IniciativaRecitalCard(props) {
    
    const { push } = useHistory();
    const { user } = useContext(UserContext);

    const traducirFecha = () => {
        var fechaDeRecital = moment(props.iniciativaDeRecital.fecha);
        moment.locale('es');
        fechaDeRecital.locale(false);
        return fechaDeRecital.format('dddd D [de] MMMM [de] YYYY');
      }

    const solicitarParticipacion =()=>{
        console.log("envia whatsap");
    }
    
    const cerrarConvocatoriaDeRecital=(idDeIniciativaDeRecital)=>{
        console.log("marcar iniciativa con id "+ idDeIniciativaDeRecital+ " como cerrada.");
    }


    return(
        <>
            <div className="formulario-carga-banda background-form  pt-4 mb-4">
                <Row>
                    <Col md="3" className="">
                        <div className="d-flex justify-content-center">
                            <img alt="..." className="" onClick={()=>{push("/banda/"+props.iniciativaDeRecital.banda.id )}} src={props.iniciativaDeRecital.banda.imagen} />
                        </div>
                        <a href={"/banda/"+props.iniciativaDeRecital.banda.id} className="d-flex justify-content-center mt-2">
                            <h3 className="mb-1">{props.iniciativaDeRecital.banda.nombre}</h3>
                        </a>
                        <div className="d-flex justify-content-center mb-3">
                            {props.iniciativaDeRecital.banda.id===user.banda.id &&
                                    <Button id={props.iniciativaDeRecital.id} className="btn-sm btn-warning" onClick={(event)=>{cerrarConvocatoriaDeRecital(event.target.id)}}>Cerrar convocatoria</Button>
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
                                <Button id="tooltip" className="btn-icon btn-round btn btn-facebook btn-sm" onClick={solicitarParticipacion()}>
                                    <img alt="..." className="" src={require("../../assets/img/whatsapp.png")} />
                                </Button>
                                <UncontrolledTooltip placement="bottom" target="tooltip">
                                    Envia un mensaje de whatsapp al organizador
                                </UncontrolledTooltip>
                            </div>
                            {/* <Button id="tooltip" className="btn-icon btn-round btn btn-facebook btn-sm" >
                                <img alt="..." className="" src="data:image/jpeg;base64,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" />
                            </Button>
                            <Button id="tooltip" className="btn-icon btn-round btn btn-facebook btn-sm" >
                                <img alt="..." className="" src= {require("../../assets/img/iconfinder_gmail_1220340.png")} />
                            </Button> */}
                        </div>

                    </Col>
                </Row>

            </div>
    </>
    );

}

export default IniciativaRecitalCard;