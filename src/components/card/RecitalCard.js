import React from 'react';
import { Row, Card, Col, CardBody, CardFooter, CardTitle } from "reactstrap";

function RecitalCard({ recital }) {
	return(
        <Col md={4}>
		    <Card className="offset-2 col-md-12" key={recital.id}>
			    <CardTitle>
                    <h1 className="mt-2 mb-0 text-center">{recital.nombre}</h1>
                </CardTitle>
                <CardBody className="pb-0">
                    <Row>
                        <img  className="card-img-top imageCard" src={recital.imagen}/>
                    </Row>
                    <br></br>
                    <Row>
                        <h4>{recital.descripcion}</h4>
                        <h3>{recital.lugar}</h3>
                        <h3>{recital.direccion}</h3>
                        <h3>{recital.fecha}</h3>
                        <h3>{recital.hora}</h3>
                    </Row>
                </CardBody>
                <CardFooter>
                </CardFooter>
		    </Card>
        </Col>
	);
}

export default (RecitalCard);