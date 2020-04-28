import React from 'react';
import { Row, Card, CardBody, Col, CardFooter, CardTitle } from "reactstrap";

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
                <Col>
                    <p>{recital.localidad}</p>
                    <p>{recital.lugar}</p>
                </Col>
            {/* </CardBody>
            <CardBody className=""> */}

            </CardBody>
            {/* <CardFooter>
                </CardFooter> */}
        </Card>
    );
}

export default (RecitalCard);