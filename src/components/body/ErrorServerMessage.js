import React from "react";
import {Button} from "reactstrap";

class ErrorServerMessage extends React.Component {
    render() {
        return (
            <>
                <img
                    alt="..."
                    className="img-center img-fluid rounded-circle medium"
                    src={require("assets/img/circuito.png")}
                />
                <h1 className="h1-seo mt-2">ERROR SERVIDOR CAÍDO</h1>
                <h3 className="mb-0"> El servidor está caído.</h3>
                <h3> Por favor intentarlo nuevamente mas tarde.</h3>
                <div className="pt-3">
                    <Button href="/">Volver al inicio</Button>
                </div>
            </>
        )
    }
}

export default ErrorServerMessage;