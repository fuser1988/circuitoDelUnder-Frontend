import React, {useEffect, useState} from 'react';
import { Row, Card, CardBody, CardTitle } from "reactstrap";

import "assets/css/nucleo-icons.css";

import { useHistory } from "react-router-dom";

function BandaCard(props) {

    const [ banda, setBanda ] = useState([])
    const { push } = useHistory();

    useEffect(() => {
        document.body.classList.toggle("index-page");
        setBanda(props.banda)
        return () => {
            document.body.classList.toggle("index-page");
        }
    },[]);

    const redirectBanda = (event) => {
		push("/banda/" + event.currentTarget.id );
	}

    return (
        <>
            <Card className="mt-2 ml-2 col-3 responsive-card" key={banda.id}>
                <CardBody className="">
                    <Row className="d-flex justify-content-center">
                        <img alt="" className="" src={banda.imagen} id="" />
                    </Row>
                    <CardTitle className="mt-2 mb-0 text-center bold-text">
                        <a className="focus-pointer" href="###" key={banda.id} id={banda.id} onClick={redirectBanda}>
                            {banda.nombre}
                        </a>
                    </CardTitle>
                </CardBody>
            </Card>
        </>
    );

}

export default BandaCard;