import React from "react";

import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import {Container} from "reactstrap";

class TemplateFormPage extends React.Component {
    render() {
        return (
        <> 
        <div
            className="page-header"
            style={{
            backgroundImage: "url(" + require("../assets/img/equipos5.jpg") + ")"
            }}
        >
                  
            <RecitalesNavbar />
            <Container className="formulario-angosto"> 
           <div className="formulario-carga-banda background-form ">

                <h2 className="text-center mt-3 font-weight-bold">Carga tu banda </h2>  
                {this.props.children}

            </div>
          </Container>
            </div>
        </>
        );
    }
}

export default TemplateFormPage;