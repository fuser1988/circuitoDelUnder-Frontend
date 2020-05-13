import React, { useState, useEffect } from "react";

import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import GrillaRecitales from "components/body/GrillaRecitales.js";
import { useRecitalService } from "services/RecitalService.js";
import SearchComponent from "components/search/SearchComponent.js";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.css';

function RecitalesPage(props) {
    const { buscarPorNombreYGenero, traerTodos} = useRecitalService();
    const [ recitales, setRecitales ] = useState([]);
    
    useEffect(() => {
        document.body.classList.toggle("index-page");
        buscarRecitales();
        return () => {
            document.body.classList.toggle("index-page");
        }
    },[]);

    const notificar = (mensaje) => toast(mensaje, {
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
    });

    //buscar equivalente con funciones y hooks
    // const componentWillReceiveProps = (nextProps) => {
    //     this.props = nextProps;
    //     this.buscarRecitales();
    // }

    const buscarRecitales = () => {
        const { match: { params } } = props;
        buscarPorNombreYGenero(params.busqueda)
            .then((recitales) => { procesarResultadoDeBusqueda(recitales); })
            .catch((message) => { notificar(message) });
    }

    const buscarTodosLosRecitales = () => {
        traerTodos()
            .then((recitales) => { setRecitales( recitales ); })
            .catch((message) => { notificar(message) });
    }

    const procesarResultadoDeBusqueda = (recitales) => {
        if (recitales.length === 0) {
            buscarTodosLosRecitales();
            notificar("No se encontraron resultados para tu búsqueda. Tal vez te interesen estos recitales");
        } else {
            setRecitales(recitales);
        }

    }


    return (
        <>
            <RecitalesNavbar />
            <RecitalesHeader>
                <SearchComponent />
            </RecitalesHeader>
            <div>
                <div className="grilla-Responsive offset-md-2 col-10">
                    <GrillaRecitales recitales={recitales} />
                    <ToastContainer />
                </div>
            </div>
        </>
    );

}

export default RecitalesPage;
