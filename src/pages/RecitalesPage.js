import React, {useState} from "react";

import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import GrillaRecitales from "components/body/GrillaRecitales.js";
import {buscarPorNombreYGenero, traerTodos} from "services/RecitalService.js";
import SearchComponent from "components/search/SearchComponent.js";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.css';

function RecitalesPage(props) {

    const {recitales, setRecitales} = useState([])
    
    React.useEffect(()=>{
        document.body.classList.toggle("index-page");
        buscarRecitales();
    });

    notificar = (mensaje) => toast(mensaje, {
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
    });

    
    componentWillUnmount() {
        document.body.classList.toggle("index-page");
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.buscarRecitales();
    }

    buscarRecitales= ()=> {
        const { match: { params } } = this.props;
        buscarPorNombreYGenero(params.busqueda)
            .then((recitales) => { this.procesarResultadoDeBusqueda(recitales); })
            .catch((message) => { this.notificar(message) });
    }

    buscarTodosLosRecitales= ()=> {
        traerTodos()
            .then((recitales)=>{this.setState({ recitales: recitales });})
            .catch((message) => { this.notificar(message) });
    }

    procesarResultadoDeBusqueda = (recitales)=> {
        console.log(recitales);
        if (recitales.length === 0) {
            this.buscarTodosLosRecitales();
            this.notificar("No se encontraron resultados para tu búsqueda. Tal vez te interesen estos recitales");
        } else {
            this.setState({ recitales: recitales });
        }

    }

    render() {
        return (
            <>
                <RecitalesNavbar />
                <RecitalesHeader>
                    <SearchComponent />
                </RecitalesHeader>
                <div>
                    <div className="grilla-Responsive offset-md-2 col-10">
                        <GrillaRecitales recitales={this.state.recitales} />
                        <ToastContainer />
                    </div>
                </div>
            </>
        );
    }
}

export default RecitalesPage;
