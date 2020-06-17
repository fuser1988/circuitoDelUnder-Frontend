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
import Pagination from "react-js-pagination";

function RecitalesPage(props) {

    const { buscarPorNombreYGenero, traerTodos} = useRecitalService();
    const [ recitales, setRecitales ] = useState([]);
    const [cargandoRecitales,setCargandoRecitales] = useState(true);

    const [activePage, setActivePage] = useState(1);
    const [itemsCountPorPage] = useState(9);
    const [totalItemsCount, setTotalItemsCount] = useState();

    const [busqueda, setBusqueda] = useState();

    useEffect(() => {
        buscarRecitales();
        return () => {
        }
    },[]);

    const onChange = (event) => {
        buscarRecitalesPorGenero(event, activePage)
    }

    const onChangeBusqueda = (event) => {
        setBusqueda(event)
        buscarRecitalesPorGenero(event, activePage)
    }
    
    const notificar = (mensaje) => toast(mensaje, {
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
    });

    const buscarRecitalesPorGenero = (busqueda, page) => {
        setCargandoRecitales(true);
        buscarPorNombreYGenero(busqueda, (page -1), itemsCountPorPage)
        .then((response) => { 
            procesarResultadoDeBusqueda(response.content); 
            setTotalItemsCount(response.totalElements);
            setCargandoRecitales(false); 
        }).catch((message) => { notificar(message) });
    }

    const buscarRecitales = () => {
        const pathname = props.location.pathname;
        (pathname === "/RecitalesPage") ? buscarTodosLosRecitales(activePage) : buscarRecitalesPorGenero(pathname.slice(15), activePage)
    }
    
    const buscarTodosLosRecitales = (page) => {
        setCargandoRecitales(true);
        traerTodos((page -1), itemsCountPorPage)
            .then((response) => { 
                setRecitales(response.content); 
                setTotalItemsCount(response.totalElements);
                setCargandoRecitales(false); })
            .catch((message) => { notificar(message) });
    }

    const procesarResultadoDeBusqueda = (recitales) => {
        if (recitales.length === 0) {
            buscarTodosLosRecitales(activePage);
            notificar("No se encontraron resultados para tu búsqueda. Tal vez te interesen estos recitales");
        } else {
            setRecitales(recitales);
        }

    }

    const handlePageChange = (event) => {
        setActivePage(event);
        (busqueda === undefined)? buscarRecitales(): buscarRecitalesPorGenero(busqueda, event)
    }

    const recitalesGrilla = () => {
        return(
            <div>
                <GrillaRecitales recitales={recitales} />
                <div className="d-flex justify-content-center">
                    <Pagination
                    hideNavigation
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPorPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={3}
                    itemClass='page-item'
                    linkClass='btn btn-light'
                    onChange={handlePageChange}
                    />
                </div>
            </div>
            )    
    }

    return (
        <div className="recitalPage">
            <RecitalesNavbar />
            <RecitalesHeader>
                <SearchComponent busqueda={onChange} changeBusqueda={onChangeBusqueda}/>
            </RecitalesHeader>
            <div>
                <div className="grilla-Responsive offset-md-2 col-10">
                    {cargandoRecitales?<Spinner/>:recitalesGrilla()}
                    <ToastContainer />
                </div>
            </div>
        </div>
    );

}

export default RecitalesPage;
