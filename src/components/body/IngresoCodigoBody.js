import React, { useState } from "react";
import { Button, Form, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import classnames from "classnames";
function IngresoCodigoBody(props) {

    const [passwordFocus, setPasswordFocus] = useState(false);
    const [codigoVerificacion, setCodigoVerificacion] = useState("");

    React.useEffect(() => {
        //didMount
        return () => {

        }
    }, []);

    return (
        <>
            <h1 className="h1-seo mt-2">BIENVENIDO ESTAS SOLO FALTA UN PASO DE TERMINAR DE REGISTRA TU CUENTA</h1>
            <h3 className="mb-0"> Enviamos un código de verificación a tu cuenta de correo electrónico.
                Ingrésalo aquí y termina de registrar tu cuenta..</h3>
            <div className="col-3">
            <Form className="form">   
            <InputGroup
                className={classnames({
                    "input-group-focus": passwordFocus
                })}
                >
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className="tim-icons icon-lock-circle" />
                    </InputGroupText>
                </InputGroupAddon>
                <Input
                    placeholder="Password"
                    type="text"
                    onFocus={e =>
                        setPasswordFocus(true)
                    }
                    onBlur={e =>
                        setPasswordFocus(false)
                    }
                    />
            </InputGroup>
            </Form>
            </div>
            <div className="row justify-content-center">
                <div className="pt-3">
                    <Button href="/">Volver al inicio</Button>
                </div>
                <div className="pl-2 pt-3">
                    <Button href="/">Enviar código</Button>
                </div>

            </div>

        </>
    )

}

export default IngresoCodigoBody;