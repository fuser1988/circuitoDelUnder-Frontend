import React from "react";
import { Button } from "reactstrap";

class NotFoundMessage extends React.Component {
    render() {
        return (
            <>
                <img
                    alt="..."
                    className="img-center img-fluid rounded-circle medium"
                    src={require("assets/img/circuito.png")}
                />
                <h1 className="h1-seo mt-2">404 NOT FOUND</h1>
                <h3 className="mb-0"> No se encontró el recurso al que intenta acceder..</h3>
                <div className="pt-3">
                    <Button href="/">Volver al inicio</Button>
                </div>
            </>
        )
    }
}

export default NotFoundMessage;