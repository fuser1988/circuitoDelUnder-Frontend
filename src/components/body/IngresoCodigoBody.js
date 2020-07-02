import React, { useState, useContext } from "react";
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import classnames from "classnames";
import {UserContext} from "context/UserContext.js";
import { useUsuarioService } from "services/UsuarioService.js";

function IngresoCodigoBody(props) {
    
    const { validarCodigoCuenta } = useUsuarioService();
    const {user, setUser} = useContext(UserContext);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [codigoVerificacion, setCodigoVerificacion] = useState("");

    React.useEffect(() => {
        //didMount
        return () => {

        }
    }, []);


    const validarCodigo = () => {
        let codigoVerificacionConUsuario= {};
        codigoVerificacionConUsuario.codigo = codigoVerificacion;
        codigoVerificacionConUsuario.usuarioId = user.id;
        validarCodigoCuenta(codigoVerificacionConUsuario)
        .then((usuario)=>{
            console.log(usuario.tipoUsuario);
            if(usuario.tipoUsuario === "REGISTRADO_SIN_CONFIRMACION"){
                setCodigoVerificacion("");
                props.notificarFallo();
            }else{
                setUser(usuario);
                props.redirect();
            }
        })
        
    }

    const actualizarInput=(event)=>{
        setCodigoVerificacion(event.target.value);
    }

    return (
        <>
            
            <h1 className="h1-seo mb-3 mt-2">BIENVENIDO SOLO FALTA UN PASO PARA TERMINAR DE REGISTRAR TU CUENTA</h1>
            <h3 className="mb-0"> Enviamos un código de verificación a tu cuenta de correo electrónico.
                Ingrésalo aquí y termina de registrar tu cuenta.</h3>
            <div className="pt-2 offset-md-3 col-md-6 col-sm-12 intput-valacion-size">
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
                        placeholder="código de validación"
                        type="text"
                        onFocus={e =>
                            setPasswordFocus(true)
                        }
                        onBlur={e =>
                            setPasswordFocus(false)
                        }
                        onChange={(event)=>{actualizarInput(event)}}
                        value={codigoVerificacion}
                    />
                </InputGroup>
            </div>
            <div className="row justify-content-center">
                <div className="pt-2">
                    <Button href="/">Volver al inicio</Button>
                </div>
                <div className="pl-2 pt-2">
                    <Button href="###" onClick={validarCodigo}>Enviar código</Button>
                </div>

            </div>

        </>
    )

}

export default IngresoCodigoBody;