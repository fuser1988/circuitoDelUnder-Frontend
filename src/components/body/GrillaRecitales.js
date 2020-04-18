import React from 'react';
import { Row, Card, Col, CardBody, CardFooter, CardTitle } from "reactstrap";

class GrillaRecitales extends React.Component {

    render() {
        return <>

            {this.props.recitales.map(recital => {
                return <Card className="offset-2 col-md-8" key={recital.id}>
                    <CardTitle>
                        <h1 className="mt-2 mb-0 text-center">{recital.nombre}</h1>
                    </CardTitle>
                    <CardBody className="pb-0">
                        <Row>
                            <Col md="6" className="">
                                <img
                                    alt="..."
                                    className=""
                                    src={recital.imagen}
                                />
                            </Col>
                            <Col md="6" className="">
                                <h4>{recital.descripcion}</h4>
                                <h3>{recital.lugar}</h3>
                                <h3>{recital.direccion}</h3>
                                <h3>{recital.fecha}</h3>
                                <h3>{recital.hora}</h3>

                            </Col>

                        </Row>
                    </CardBody>
                    <CardFooter>
                    </CardFooter>
                </Card >
            })}
        </>
    }
}

export default GrillaRecitales;