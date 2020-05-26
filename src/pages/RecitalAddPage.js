import React, { useState } from "react";
import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import LoadRecitalForm from "components/form/LoadRecitalForm.js";
import { Card, Container } from "reactstrap";
import { useRecitalService } from "services/RecitalService.js";

function RecitalAddPage() {

    const { traerTodasLasBandas } = useRecitalService();
    const [bandas, setBandas] = useState([]);

    React.useEffect(() => {
        obternerbandas();
        return () => {
        }
    }, []);

    const obternerbandas = () => {
        traerTodasLasBandas()
            .then((bandasObtenidas) => {
                setBandas(bandasObtenidas)
            })
    }
    return (
        <>

            <div
                className="page-header fondo-responsive"

            >
                <RecitalesNavbar />
                <RecitalesHeader />
                <Container className="formulario-angosto">
                    <div className="formulario-carga-banda background-form ">
                        <LoadRecitalForm bandas={bandas} />
                    </div>
                </Container>
            </div>
        </>
    );
}

export default RecitalAddPage;