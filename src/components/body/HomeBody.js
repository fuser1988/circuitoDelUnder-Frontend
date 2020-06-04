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
                        "url(" + require("assets/img/ecenario2.png") + ")"
                }}
            >
                <div className="content-center top-center">
                    <Container>
                        <h1 className="tituloHome">Comparti donde estes lo mejor de la musica under.</h1>
                        <p className=" subtituloHome">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five .
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
