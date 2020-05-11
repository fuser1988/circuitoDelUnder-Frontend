import React from "react";

class ErrorServerMessage extends React.Component {
    render() {
        return (
            <>
                <img
                    alt="..."
                    className="img-center img-fluid rounded-circle medium"
                    src={require("assets/img/circuito.png")}
                />
                <h1 className="h1-seo mt-2">500 SERVER ERROR</h1>
                <h3 className="mb-0"> Ocurrió un error en el servidor.</h3>
                <h3> Por favor intentarlo nuevamente mas tarde.</h3>
            </>
        )
    }
}

export default ErrorServerMessage;