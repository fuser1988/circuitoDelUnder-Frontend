import React from "react";
import { Button } from "reactstrap";

class NotFoundMessage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          status: this.props.status,
          message: this.props.message,
          titulo: this.props.titulo
        }
    }

    render() {
        return (
            <>
                <img
                    alt="..."
                    className="img-center img-fluid rounded-circle medium"
                    src={require("assets/img/circuito.png")}
                />
                <h1 className="h1-seo mt-2">{this.state.status} {this.state.titulo}</h1>
                <h3 className="mb-0">{this.state.message}</h3>
                <div className="pt-3">
                    <Button href="/">Volver al inicio</Button>
                </div>
            </>
        )
    }
}

export default NotFoundMessage;