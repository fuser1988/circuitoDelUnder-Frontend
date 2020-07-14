import React, { useContext } from "react";

import { Container, Button } from "reactstrap";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { UserContext } from "context/UserContext.js";
import { useHistory } from "react-router";
import { useUsuarioService } from "services/UsuarioService.js";
import Referencia from "model/Referencia.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../toast.css';

const HomeBody = () => {
    const { push } = useHistory();
    const { buscarUsuario } = useUsuarioService();
    const { user, setUser } = useContext(UserContext);

    React.useEffect(() => {

        return () => {

        }
    }, []);

    const notificar = (mensaje) => toast(mensaje, {
        className: 'black-background',
        bodyClassName: "grow-font-size",
        progressClassName: 'fancy-progress-bar'
    });

    const respuestaDeLoginConFaceboook = (response) => {
        let referencia = new Referencia(response);
        notificar("Hola " + response.name + " estamos procesando tus datos.");
        setUser(response);
        buscarUsuario(referencia)
        .then(((usuario) => {
            setUser(usuario);
            procesarRespuestaDelBackend(usuario);
        }))
        
        const procesarRespuestaDelBackend = (usuario) => {
            
            if (usuario.tipoUsuario === "REGISTRADO_SIN_CONFIRMACION") {
                push("/confirmaciones-de-cuentas");
            } 
        }
    }

    const falloLogin = () => {
        setUser(null);
    }

    return (
        <>
            <ToastContainer />
            <div
                className="page-header section-dark"
                style={{
                    backgroundImage:
                        "url(" + require("assets/img/fondoCircuito.jpg") + ")"
                }}
            >
                <div className="content-center top-center">
                    <Container>
                        <h1 className="tituloHome">Compartí donde estes lo mejor de la música under.</h1>
                        <p className=" subtituloHome">
                        Descubrí las bandas under más sobresalientes de tu ciudad. A través de Circuito del Under 
                            conectate con las bandas del estilo que más te identifiquen,
                            conocé sus perfiles, material y los lugares donde tocan.<br/> 
                            Registrate usando Facebook y unite al Circuito del Under,
                            difundí la actividad de tu banda y conéctate con otras bandas para organizar recitales. 
                            </p>
                        <div className="mt-sm-5 ">
                            <Button className="col-sm-4 col-md-3 sm-mt btn-small" href="/BandasPage">Bandas</Button>
                            <Button className="col-sm-4 col-md-3 btn-small" href="/RecitalesPage" >Recitales</Button>
                        </div>

                        {!user && (
                            <div className="row d-flex justify-content-end align-items-center mt-4">
                                <div className="mobile-align">
                                    <p className="pie-pagina-font mr-2">Registrá tu banda a través Facebook.</p>
                                </div>
                                <div className="justify-content-center mobile-align">
                                    <FacebookLogin
                                        appId="222983722267666"
                                        onFailure={falloLogin}
                                        callback={respuestaDeLoginConFaceboook}
                                        fields="name,email,picture"
                                        render={renderProps => (
                                            <Button id="tooltip" className="btn-icon btn-round btn btn-facebook btn-lg" onClick={renderProps.onClick}>
                                                <i className="fab fa-facebook-square" />
                                            </Button>
                                        )}
                                        />
                                    </div>

                            </div>
                        )}                      
                </Container>
                </div>
            </div>
        </>
    );

}

export default HomeBody;
