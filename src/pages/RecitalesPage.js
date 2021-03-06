import React, { useState, useEffect } from "react";

import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import GrillaRecitales from "components/body/GrillaRecitales.js";
import { useRecitalService } from "services/RecitalService.js";
import SearchComponent from "components/search/SearchComponent.js";
import Spinner from "components/spinner/Spinner.js";
import queryString from "query-string";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toast.css';
import Paginacion from 'components/pagination/Paginacion.js';

function RecitalesPage(props) {

    const { buscarPorUbicacion, buscarRecitalesporBandaId, buscarPorNombreYGenero, traerTodos} = useRecitalService();
    const [ recitales, setRecitales ] = useState([]);
    const [cargandoRecitales,setCargandoRecitales] = useState(true);

    const [activePage, setActivePage] = useState(1);
    const [itemsCountPorPage] = useState(9);
    const [totalPages, setTotalPages] = useState(0);

    const [busqueda, setBusqueda] = useState();
    const [busquedaUbicacion, setBusquedaUbicacion] = useState(false);

    useEffect(() => {
       buscarRecitales();
        return () => {
        }
    },[]);
    
    const onChange = (event) => {
        buscarRecitalesPorGenero(event, 1);
    }
    
    const onChangeBusqueda = (event) => {
        setActivePage(1)
        setBusqueda(event)
        setActivePage(1)
        setBusquedaUbicacion(false)
        buscarRecitalesPorGenero(event, 1)
    }
    
    const notificar = (mensaje) => toast(mensaje, {
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
    });

    const onChangeBusquedaUbicacion = (event) => {
        setActivePage(1)
        setBusqueda(event);
        setBusquedaUbicacion(true);
        buscarEnUbicacion(event, 1);
    }

    const buscarRecitalesPorGeneroUbicacion = (busqueda, page) => {
        (busquedaUbicacion)? buscarEnUbicacion(busqueda, page): buscarRecitalesPorGenero(busqueda, page);
    }

    const buscarRecitalesPorGenero = (busqueda, page) => {
        setCargandoRecitales(true);
        buscarPorNombreYGenero(busqueda, (page -1), itemsCountPorPage)
        .then((response) => { 
            procesarResultadoDeBusqueda(response.content);
            setTotalPages(response.totalPages);
            setCargandoRecitales(false); 
        }).catch((message) => { notificar(message) });
    }
    
    const buscarEnUbicacion = (busqueda, page) => {
        setCargandoRecitales(true);
        buscarPorUbicacion(busqueda, (page -1), itemsCountPorPage)
        .then((response) => { 
            procesarResultadoDeBusqueda(response.content);
            setTotalPages(response.totalPages);
            setCargandoRecitales(false); 
        }).catch((message) => { notificar(message) });
    }

    const buscarRecitales = (event) => {
        const pathname = props.location.pathname;
        if(pathname === "/RecitalesPage"){
            const  stringParam = queryString.parse(props.location.search);
            if(stringParam.genero){
                buscarRecitalesPorGenero(pathname.slice(15), event);
            }else{
                buscarTodosLosRecitales(event);
            }
        } 
        if(pathname.slice(0,21) === "/RecitalesPage/banda/"){
            console.log(pathname);
            console.log(pathname.slice(21));
            buscarRecitalesPorIdDeBanda(pathname.slice(21));
        }    
    }

    const buscarRecitalesPorIdDeBanda = (id)=>{
                document.getElementById("search-component").classList.add("hidden");
                buscarRecitalesporBandaId(id).then((response)=>{
            setRecitales(response.content);
            setTotalPages(response.totalPages);
            setCargandoRecitales(false);
        });
    }
    
    const buscarTodosLosRecitales = (page) => {
        setCargandoRecitales(true);
        traerTodos((page -1), itemsCountPorPage)
            .then((response) => { 
                procesarResultadoDeBusquedaTodo(response.content); 
                setTotalPages(response.totalPages);
                setCargandoRecitales(false); 
            }).catch((message) => { notificar(message) });
    }

    const procesarResultadoDeBusquedaTodo = (recitales) => {
        if (recitales.length === 0) {
            notificar("No se encontraron recitales en el sistema");
        }
        setRecitales(recitales);
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
        (busqueda === undefined)? buscarRecitales(event): buscarRecitalesPorGeneroUbicacion(busqueda, event)
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

    const recitalesGrilla = () => {
        return(
        <>
            <div className="grilla-Responsive offset-md-2 col-10">
                <GrillaRecitales recitales={recitales} />
            </div>
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
        </>
            )    
    }

    return (
        <div className="recitalPage">
            <RecitalesNavbar />
            <RecitalesHeader>
                <SearchComponent busqueda={onChange} changeBusqueda={onChangeBusqueda} busquedaUbicacion={onChangeBusquedaUbicacion}/>
            </RecitalesHeader>
            <div>
                {cargandoRecitales?<Spinner/>:recitalesGrilla()}
            </div>
        </div>
    );

}

export default RecitalesPage;
