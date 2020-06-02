import React, { useState, useEffect } from "react";

import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import GrillaBandas from "components/body/GrillaBandas.js";
import { useBandaService } from "services/BandaService.js";
import SearchComponentBanda from "components/search/SearchComponentBanda.js";
import Spinner from "components/spinner/Spinner.js";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toast.css';

function BandasPage(props) {

    const { buscarPorGenero, buscarPorNombre, traerTodos} = useBandaService();
    const [ bandas, setBandas ] = useState([]);
    const [cargandoBandas,setCargandoBandas] = useState(true);
    
    useEffect(() => {
        document.body.classList.toggle("index-page");
        buscarBandas();
        return () => {
            document.body.classList.toggle("index-page");
        }
    },[]);

    const notificar = (mensaje) => toast(mensaje, {
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
    });

    const onChange = (event) => {
        buscarBandasPorGenero(event)
    }

    const buscarBandasPorGenero = (busqueda) => {
        setCargandoBandas(true);
        buscarPorGenero(busqueda)
        .then((bandas) => { procesarResultadoDeBusqueda(bandas)})
        .catch((message) => { notificar(message) });
    }

    const buscarBandas = () => {
        buscarTodasLasBandas();
    }
    
    const buscarTodasLasBandas = () => {
        setCargandoBandas(true);
        traerTodos()
            .then((bandas) => { setBandas( bandas ); setCargandoBandas(false)})
            .catch((message) => { notificar(message) });
    }

    const procesarResultadoDeBusqueda = (bandas) => {
        if (bandas.length === 0) {
            buscarTodasLasBandas();
            notificar("No se encontraron resultados para tu búsqueda. Tal vez te interesen estas bandas");
        } else {
            setBandas(bandas);
            setCargandoBandas(false)
        }
    }


    return (
        <div className="recitalPage">
            <RecitalesNavbar />
            <RecitalesHeader>
                <SearchComponentBanda busqueda={onChange}/>
            </RecitalesHeader>
            <div>
                <div className="grilla-Responsive offset-md-2 col-10">
                    {cargandoBandas?<Spinner/>:<GrillaBandas bandas={bandas}/>}
                    <ToastContainer />
                </div>
            </div>
        </div>
    );

}

export default BandasPage;
