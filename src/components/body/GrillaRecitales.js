import React from 'react';
import { Row, Card, Col, CardBody, CardFooter, CardTitle } from "reactstrap";
import RecitalCard from '../card/RecitalCard';

class GrillaRecitales extends React.Component {

    render() {
        return <>

            {this.props.recitales.map(recital => {
                return <RecitalCard recital = {recital}/>
            })}
        </>
    }
}

export default GrillaRecitales;