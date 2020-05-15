import React, { useState, useEffect } from "react";

import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import GrillaRecitales from "components/body/GrillaRecitales.js";
import { useRecitalService } from "services/RecitalService.js";
import SearchComponent from "components/search/SearchComponent.js";
import Spinner from "components/spinner/Spinner.js";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toast.css';

function RecitalesPage(props) {

    const { buscarPorNombreYGenero, traerTodos} = useRecitalService();
    const [ recitales, setRecitales ] = useState([]);
    const [cargandoRecitales,setcargandoRecitales] = useState(true);
    
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

    const buscarRecitales = () => {
        setcargandoRecitales(true);
        const { match: { params } } = props;
        buscarPorNombreYGenero(params.busqueda)
        .then((recitales) => { procesarResultadoDeBusqueda(recitales); setcargandoRecitales(false); })
        .catch((message) => { notificar(message) });
    }
    
    const buscarTodosLosRecitales = () => {
        setcargandoRecitales(true);
        traerTodos()
            .then((recitales) => { setRecitales( recitales ); setcargandoRecitales(false); })
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
                    {cargandoRecitales?<Spinner/>:<GrillaRecitales recitales={recitales} />}
                    <ToastContainer />
                </div>
            </div>
        </>
    );

}

export default RecitalesPage;
