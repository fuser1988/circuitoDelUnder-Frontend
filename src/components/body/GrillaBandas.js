import React, { useState, useEffect } from "react";
import BandaCard from '../card/BandaCard';

function GrillaBandas(props) {

    const [ bandas, setBandas ] = useState([]);

    useEffect(() => {
        document.body.classList.toggle("index-page");
        obtenerBandas(props.bandas);
        return () => {
            document.body.classList.toggle("index-page");
        }
    },[]);

    const obtenerBandas = (bandas) => {
        setBandas( bandas )
    }
 
    return (
        <>
            <div className="row">
                {bandas.map(banda => {
                    return <BandaCard banda={banda}/>
                })}
            </div>
        </>
    );

}

export default GrillaBandas;