import React, { useState }from "react";
import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import LoadRecitalForm from "components/form/LoadRecitalForm.js";
import { Card } from "reactstrap";
import {useRecitalService} from "services/RecitalService.js";

function RecitalAddPage(){

    const {  traerTodasLasBandas } = useRecitalService();
    const [ bandas, setBandas ] = useState([]);

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
    })
} 
        return (
            <>
                <RecitalesNavbar />
                <RecitalesHeader />
                <Card className="offset-2 col-8 responsive-card mt-4">
                    <LoadRecitalForm bandas = {bandas} />
                </Card>
                </>
        );
}

export default RecitalAddPage;