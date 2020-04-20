import React from "react";

import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import GrillaRecitales from "components/body/GrillaRecitales.js";

import API from "utils/api.js";


class RecitalesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recitales: [
                {
                    id: 1,
                    nombre: "Convencion de Batmans",
                    descripcion: "MAÑACO se precenta con su nueva formacion en El bar del fondo no te lo pierdas",
                    bandas: [
                        "MAÑACO",
                        "ETILIKO",
                        "SinFronteras"
                    ],
                    fecha: "2018-10-29",
                    hora: "22:00:00",
                    generos: [
                        "ROCK",
                        "METAL",
                        "PUNK"
                    ],
                    direccion: "alvares tomas 2015",
                    localidad: "Quilmes",
                    lugar: "Bar del fondo",
                    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQMyXyrm9xL_dEbm3gZVD_4wru7ITpJAWxgEZYbQcDfR4WvKsrp&usqp=CAU",
                    precio: 0
                }
            ]
        };
    }

    componentDidMount() {
        document.body.classList.toggle("index-page");
        this.getRecitales();
    }
    componentWillUnmount() {
        document.body.classList.toggle("index-page");
    }

    getRecitales() {
        // const { match: { params } } = this.props;
        API.get(`recitales`)
            .then(({ data: _recitales }) => {

                this.setState({ recitales: _recitales });
            });
    }

    render() {
        return (
            <>
                <RecitalesNavbar />
                <RecitalesHeader />
                <div className="wrapper">
                    {/* <FondoRecitalesPage /> */}
                    {/* <div className="main"> */}
                    <div className="row">
                        <div className="col-md-2">

                        </div>
                        <div className="col-md-8">
                            <GrillaRecitales recitales={this.state.recitales} />

                        </div>
                        <div className="col-md-2">

                        </div>

                    </div>

                    {/* </div> */}
                    {/* <Footer /> */}
                </div>
            </>
        );
    }
}

export default RecitalesPage;
