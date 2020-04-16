import React from "react";

import { Container } from "reactstrap";

import SearchComponent from "components/search/SearchComponent.js";

class HomeBody extends React.Component {
    render() {
        return (
            <div
                className="page-header section-dark"
                style={{
                    backgroundImage:
                        "url(" + require("assets/img/ecenario2.png") + ")"
                }}
            >
                <Container>
                   <div className="content-center brand">
                     <h1 className="h1-seo">CIRCUITO DEL UNDER</h1>
                     <h3 className="d-none d-sm-block">
                       Comparti a cada momento lo mejor de la musica.
                     </h3>
                     <SearchComponent/>
                   </div>
                 </Container>
            </div>
        );
    }
}

export default HomeBody;
