import React, { useState }from "react";
import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import LoadRecitalForm from "components/form/LoadRecitalForm.js";
import { Card } from "reactstrap";
import {useRecitalService} from "services/RecitalService.js";

function RecitalAddPage(){

    const {  traerTodasLasBandas } = useRecitalService();
    const [ bandas, setBandas ] = useState([]);
    const [ bandasOpciones, setOpciones ] = useState([]);

    React.useEffect(() => {
        document.body.classList.toggle("index-page");
        obternerbandas();
        return () => {
            document.body.classList.toggle("index-page");
        }
   },[]);

    const obternerbandas = () => {
        traerTodasLasBandas()
        .then((bandasObtenidas) =>{
            setBandas(bandasObtenidas)
            let nombreOpicones = [];
            Object.values(bandasObtenidas).forEach(
                (ban) => {
                    nombreOpicones.push(ban.nombre);
            })
            setOpciones(nombreOpicones)
    })
} 
        return (
            <>
                <RecitalesNavbar />
                <RecitalesHeader />
                <Card className="offset-2 col-10 responsive-card">
                    <LoadRecitalForm bandas = {bandas} opciones = {bandasOpciones}/>
                </Card>
                </>
        );
}

export default RecitalAddPage;