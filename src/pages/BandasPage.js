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
import Paginacion from 'components/pagination/Paginacion.js';

function BandasPage(props) {

    const { buscarPorNombre, buscarPorGenero, traerTodos} = useBandaService();
    const [ bandas, setBandas ] = useState([]);
    const [cargandoBandas,setCargandoBandas] = useState(true);
    
    const [activePage, setActivePage] = useState(1);
    const [itemsCountPorPage] = useState(3);
    const [totalPages, setTotalPages] = useState(0);

    const [busqueda, setBusqueda] = useState();
    
    useEffect(() => {
        buscarBandas();
        return () => {
        }
    },[]);

    const notificar = (mensaje) => toast(mensaje, {
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
    });

    const onChange = (event) => {
        buscarBandasPorGenero(event, 1)
    }

    const onChangeBusqueda = (event) => {
        setBusqueda(event)
        buscarBandasPorNombre(event, 1)
    }

    const buscarBandasPorNombre = (busqueda, page) => {
        setCargandoBandas(true);
        buscarPorNombre(busqueda, (page -1), itemsCountPorPage)
        .then((response) => { 
            procesarResultadoDeBusqueda(response.content);
            setTotalPages(response.totalPages);
            setCargandoBandas(false); })
        .catch((message) => { notificar(message) });
    }

    const buscarBandasPorGenero = (busqueda, page) => {
        setCargandoBandas(true);
        buscarPorGenero(busqueda, (page-1), itemsCountPorPage)
        .then((response) => { 
            procesarResultadoDeBusqueda(response.content);
            setTotalPages(response.totalPages);
            setCargandoBandas(false); })
        .catch((message) => { notificar(message) });
    }

    const buscarBandas = (pages) => {
        const pathname = props.location.pathname;
        (pathname === "/BandasPage") ? buscarTodasLasBandas(pages) : buscarBandasPorGenero(pathname.slice(12), pages)
    }
    
    const buscarTodasLasBandas = (page) => {
        setCargandoBandas(true);
        traerTodos((page -1), itemsCountPorPage)
            .then((response) => { 
                setBandas( response.content); 
                setTotalPages(response.totalPages);
                setCargandoBandas(false); })
            .catch((message) => { notificar(message) });
    }

    const procesarResultadoDeBusqueda = (bandas) => {
        if (bandas.length === 0) {
            buscarTodasLasBandas(activePage);
            notificar("No se encontraron resultados para tu búsqueda. Tal vez te interesen estas bandas");
        } else {
            setBandas(bandas);
            setCargandoBandas(false)
        }
    }

    const handlePageChange = (event) => {
        setActivePage(event);
        (busqueda === undefined)? buscarBandas(event): buscarBandasPorNombre(busqueda, event)
    }

    const firstClick = () => {
        setActivePage(1);
        handlePageChange(1);
        
    }

    const lastClick = (lastPage) => {
        setActivePage(lastPage);
        handlePageChange(lastPage);
        
    }

    const onChangePage = (page) => {
        handlePageChange(page)
        setActivePage(page)
    }

    const bandasGrilla = () => {
        return(
            <div>
                <GrillaBandas bandas={bandas} />
                <div className="d-flex justify-content-center">
                    <Paginacion 
                    activePage={activePage} 
                    cantElemPorPage={itemsCountPorPage}
                    totalPages={totalPages}
                    onChangeFirst={firstClick}
                    onChangeLast={lastClick}
                    onChangePage={onChangePage}
                    >
                    </Paginacion>
                </div>
            </div>
            )    
    }


    return (
        <div className="recitalPage">
            <RecitalesNavbar />
            <RecitalesHeader>
                <SearchComponentBanda busqueda={onChange} changeBusqueda={onChangeBusqueda}/>
            </RecitalesHeader>
            <div>
                <div className="grilla-Responsive offset-md-2 col-10">
                    {cargandoBandas?<Spinner/>:bandasGrilla()}
                    <ToastContainer />
                </div>
            </div>
        </div>
    );

}

export default BandasPage;
