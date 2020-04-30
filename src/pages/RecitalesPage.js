import React from "react";

import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
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

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.buscarRecitales();
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
                <RecitalesNavbar />
                <RecitalesHeader />
                <div className="row">
                    <div className="grilla-Responsive offset-md-2 col-10">
                        <GrillaRecitales recitales={this.state.recitales} />
                    </div>
                </div>
            </>
        );
    }
}

export default RecitalesPage;
