import React, { useState } from "react";
import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import LoadRecitalForm from "components/form/LoadRecitalForm.js";
import { Container } from "reactstrap";
import { useBandaService } from "services/BandaService.js";

function RecitalAddPage() {

    const { traerTodasRef } = useBandaService();
    const [bandas, setBandas] = useState([]);

    React.useEffect(() => {
        obternerbandas();
        return () => {
        }
    }, []);

    const obternerbandas = () => {
        traerTodasRef()
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