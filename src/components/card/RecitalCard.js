import React from 'react';
import { Row, Card, CardBody, Col, CardTitle } from "reactstrap";

import "assets/css/nucleo-icons.css";

function RecitalCard({ recital }) {
    return (
        <Card className="mt-2 ml-2 col-3 responsive-card" key={recital.id}>
            <CardBody className="">
                <Row className="d-flex justify-content-center">
                    <img alt="" className="" src={recital.imagen} id="" />
                </Row>
                <CardTitle className="mt-2 mb-0 text-center bold-text">
                    {recital.nombre}
                </CardTitle>
                <Col className="pl-0 pr-0">
                    <p><i className ="tim-icons icon-square-pin pr-1 pb-1" aria-hidden="true"></i>{recital.lugar}</p>
                    <p>{recital.localidad}</p>
                    <p><i className ="tim-icons icon-calendar-60 pr-1 pb-1" aria-hidden="true"></i>{recital.fecha}</p>
                </Col>

            </CardBody>
        </Card>
    );
}

export default (RecitalCard);