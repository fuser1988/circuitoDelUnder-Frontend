import React, {Component} from 'react';
import { Row, Card, CardBody, Col, CardTitle } from "reactstrap";

import "assets/css/nucleo-icons.css";

import {withRouter} from "react-router-dom";

class RecitalCard extends Component {
    
    constructor(props){
        super(props);
        this.redirectRecital= this.redirectRecital.bind(this);
    }

    redirectRecital(event) {
		this.props.history.push("/recital/" + event.currentTarget.id );
	}
    
    render(){
        return(
            <Card className="mt-2 ml-2 col-3 responsive-card" key={this.props.recital.id}>
                <CardBody className="">
                    <Row className="d-flex justify-content-center">
                        <img alt="" className="" src={this.props.recital.imagen} id="" />
                    </Row>
                    <CardTitle className="mt-2 mb-0 text-center bold-text">
                        <a className="focus-pointer" href key={this.props.recital.id} id={this.props.recital.id} onClick={this.redirectRecital}>
                            {this.props.recital.nombre}
                        </a>
                    </CardTitle>
                    <Col className="pl-0 pr-0">
                        <p><i className ="tim-icons icon-square-pin pr-1 pb-1" aria-hidden="true"></i>{this.props.recital.lugar}</p>
                        <p>{this.props.recital.localidad}</p>
                        <p><i className ="tim-icons icon-calendar-60 pr-1 pb-1" aria-hidden="true"></i>{this.props.recital.fecha}</p>
                    </Col>

                </CardBody>
            </Card>
        )
        

    }
}

export default withRouter(RecitalCard);