import React, {Component} from 'react';
import { Row, Card, CardBody, Col, CardTitle } from "reactstrap";

import "assets/css/nucleo-icons.css";

import {withRouter} from "react-router-dom";
import 'moment/locale/es'
import moment from "moment";

import { FcCalendar } from 'react-icons/fc';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RiAlbumLine } from 'react-icons/ri';
    
class RecitalCard extends Component {
    
    constructor(props){
        super(props);
        this.redirectRecital= this.redirectRecital.bind(this);
    }

    redirectRecital(event) {
		this.props.history.push("/recital/" + event.currentTarget.id );
    }
    traducirFecha () {
        var fechaDeRecital = moment(this.props.recital.fecha);
        moment.locale('es');
        fechaDeRecital.locale(false);
        return fechaDeRecital.format('D [de] MMMM [de] YYYY');
      } 
    
    render(){
        return(
            <Card className="mt-2 ml-2 col-3 responsive-card" >
                <CardBody className=""  id={this.props.recital.id} >
                    <Row className="d-flex justify-content-center">
                        <img alt="" className="" src={this.props.recital.imagen}  />
                    </Row>
                    <CardTitle className="mt-2 mb-0 text-center bold-text">
                        <p className="focus-pointer"   id={this.props.recital.id} onClick={this.redirectRecital}>
                            {this.props.recital.nombre}
                        </p>
                    </CardTitle>
                    <Col className="pl-0 pr-0">
                        <div className="d-flex align-items-center">
                           <RiAlbumLine/>
                           <p className="ml-1 mb-0">{this.props.recital.lugar}</p>
                        </div>
                        <div className="d-flex align-items-center">
                           {/* <FaMapMarkerAlt/> */}
                           <p className="ml-1 mb-0">{this.props.recital.localidad}</p>
                        </div>
                        <div className="d-flex align-items-center">
                           {/* <FcCalendar/> */}
                           <p className="ml-1 mb-0">{this.traducirFecha()}</p>
                        </div>
                    </Col>

                </CardBody>
            </Card>
        )
        

    }
}

export default withRouter(RecitalCard);