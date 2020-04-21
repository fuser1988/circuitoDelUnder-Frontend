import React from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import GrillaRecitales from "components/body/GrillaRecitales.js";
import RecitaleService from "services/RecitalService.js";

class RecitalesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recitales: []
        };
        this.buscarRecitales = this.buscarRecitales.bind(this); 
    }

    componentDidMount() {
        document.body.classList.toggle("index-page");
        this.buscarRecitales();
    }
    componentWillUnmount() {
        document.body.classList.toggle("index-page");
    }

    async buscarRecitales() {
        const { match: { params } } = this.props;
        let recitalesObtenidos = await RecitaleService.buscarPorNombreYGenero(params.busqueda);
        console.log(recitalesObtenidos);
            this.setState({ recitales: recitalesObtenidos })
    }

    render() {
        return (
            <>
                <IndexNavbar />
                <RecitalesHeader />
                <div className="wrapper">
                    <div className="row">
                        <div className="col-md-2">

                        </div>
                        <div className="col-md-8">
                            <GrillaRecitales recitales={this.state.recitales} />

                        </div>
                        <div className="col-md-2">

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default RecitalesPage;
