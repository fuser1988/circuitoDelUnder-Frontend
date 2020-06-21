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
import Pagination from "react-js-pagination";

function BandasPage(props) {

    const { buscarPorNombre, buscarPorGenero, traerTodos } = useBandaService();
    const [bandas, setBandas] = useState([]);
    const [cargandoBandas, setCargandoBandas] = useState(true);

    const [activePage, setActivePage] = useState(1);
    const [itemsCountPorPage] = useState(9);
    const [totalItemsCount, setTotalItemsCount] = useState();

    const [busqueda, setBusqueda] = useState();

    useEffect(() => {
        buscarBandas();
        return () => {
        }
    }, []);

    const notificar = (mensaje) => toast(mensaje, {
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
    });

    const onChange = (event) => {
        buscarBandasPorNombre(event, activePage)
    }

    const onChangeBusqueda = (event) => {
        setBusqueda(event)
        buscarBandasPorGenero(event, activePage)
    }

    const buscarBandasPorNombre = (busqueda, page) => {
        setCargandoBandas(true);
        buscarPorNombre(busqueda, (page - 1), itemsCountPorPage)
            .then((response) => {
                procesarResultadoDeBusqueda(response.content);
                setTotalItemsCount(response.totalElements);
                setCargandoBandas(false);
            })
            .catch((message) => { notificar(message) });
    }

    const buscarBandasPorGenero = (busqueda, page) => {
        setCargandoBandas(true);
        buscarPorGenero(busqueda, (page - 1), itemsCountPorPage)
            .then((response) => {
                procesarResultadoDeBusqueda(response.content);
                setTotalItemsCount(response.totalElements);
                setCargandoBandas(false);
            })
            .catch((message) => { notificar(message) });
    }

    const buscarBandas = () => {
        const pathname = props.location.pathname;
        (pathname === "/BandasPage") ? buscarTodasLasBandas(activePage) : buscarBandasPorGenero(pathname.slice(12), activePage)
    }

    const buscarTodasLasBandas = (page) => {
        setCargandoBandas(true);
        traerTodos((page - 1), itemsCountPorPage)
            .then((response) => {
                setBandas(response.content);
                setTotalItemsCount(response.totalElements);
                setCargandoBandas(false);
            })
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
        (busqueda === undefined) ? buscarBandas() : buscarBandasPorNombre(busqueda, event)
    }

    const bandasGrilla = () => {
        return (
            <>
            <div className="grilla-Responsive offset-md-2 col-10">
                <GrillaBandas bandas={bandas} />
            </div>
            <div className="d-flex justify-content-center">
                <Pagination className="pagination"
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
            </>
            )
    }


    return (
        <div className="recitalPage">
            <RecitalesNavbar />
            <RecitalesHeader>
                <SearchComponentBanda busqueda={onChange} changeBusqueda={onChangeBusqueda} />
            </RecitalesHeader>
            <div>
                {cargandoBandas ? <Spinner /> : bandasGrilla()}
                <ToastContainer />
            </div>
        </div>
    );

}

export default BandasPage;
