import React, { useState, useEffect } from "react";

import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import GrillaRecitales from "components/body/GrillaRecitales.js";
import { useRecitalService } from "services/RecitalService.js";
import SearchComponent from "components/search/SearchComponent.js";
import Spinner from "components/spinner/Spinner.js";
import queryString from "query-string";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toast.css';

function RecitalesPage(props) {

    const { buscarRecitalesporBandaId, buscarPorNombreYGenero, traerTodos} = useRecitalService();
    const [ recitales, setRecitales ] = useState([]);
    const [cargandoRecitales,setcargandoRecitales] = useState(true);
    
    useEffect(() => {
        buscarRecitales();
        return () => {
        }
    },[]);

    const onChange = (event) => {
        buscarRecitalesPorGenero(event);
    }
    
    const notificar = (mensaje) => toast(mensaje, {
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
    });

    const buscarRecitalesPorGenero = (busqueda) => {
        setcargandoRecitales(true);
        buscarPorNombreYGenero(busqueda)
        .then((recitales) => { procesarResultadoDeBusqueda(recitales); setcargandoRecitales(false); })
        .catch((message) => { notificar(message) });
    }

    const buscarRecitales = () => {
        const pathname = props.location.pathname;
        console.log(props.location);
        if(pathname === "/RecitalesPage"){
            const  stringParam = queryString.parse(props.location.search);
            if(stringParam.genero){
                buscarRecitalesPorGenero(stringParam.genero);
            }else{
                buscarTodosLosRecitales();
            }
        } 
        if(pathname.slice(0,21) === "/RecitalesPage/banda/"){
            console.log(pathname);
            buscarRecitalesPorIdDeBanda(pathname.slice(21));
        }
        
    }
    
    const buscarRecitalesPorIdDeBanda= (id)=>{
        buscarRecitalesporBandaId(id).then((pagina)=>{
            setRecitales(pagina.content);
        });
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
        <div className="recitalPage">
            <RecitalesNavbar />
            <RecitalesHeader>
                <SearchComponent busqueda={onChange}/>
            </RecitalesHeader>
            <div>
                <div className="grilla-Responsive offset-md-2 col-10">
                    {cargandoRecitales?<Spinner/>:<GrillaRecitales recitales={recitales} />}
                    <ToastContainer />
                </div>
            </div>
        </div>
    );

}

export default RecitalesPage;
