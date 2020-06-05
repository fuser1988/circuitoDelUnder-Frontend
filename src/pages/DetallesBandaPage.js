import React, { useState } from "react";

import RecitalesNavba from "components/Navbars/RecitalesNavbar.js";

import { useBandaService } from "services/BandaService.js";
import Spinner from "components/spinner/Spinner.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import Banda from "model/Banda.js";

import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toast.css';

function DetallesBandaPage(props) {

  const { buscarPorId } = useBandaService();
  const [cargandoBanda, setcargandoBanda] = useState(true);
  const [banda, setBanda] = useState();

  React.useEffect(
    () => {
      document.body.classList.toggle("landing-page");
      buscarBanda();
      notificarSiCorresponde();
      return () => {
        document.body.classList.toggle("landing-page");
      }
    }, []);

  const notificarSiCorresponde = () => {
    const { match: { params } } = props;
    if (params.new) {
      notificar("La buscar se cargó correctamente")
    }
  }

  const notificar = (mensaje) => toast(mensaje, {
    className: 'black-background',
    bodyClassName: "grow-font-size",
    progressClassName: 'fancy-progress-bar'
  });

  const buscarBanda = () => {
    const { match: { params } } = props;
    buscarPorId(params.id)
      .then((bandaObtenido) => {
        setBanda(new Banda(bandaObtenido));
        setcargandoBanda(false);
        const banda1 = new Banda(bandaObtenido)
        console.log(bandaObtenido)
        console.log(banda1)
      })
  }

  return (
    <>
      <RecitalesNavba />
      <div className="page-header">
        <RecitalesHeader />
        <img
          alt="..."
          className="path"
          src={require("assets/img/blob.png")}
        />
        <img
          alt="..."
          className="path2"
          src={require("assets/img/path2.png")}
        />
        <img
          alt="..."
          className="shapes triangle"
          src={require("assets/img/triunghiuri.png")}
        />
        <img
          alt="..."
          className="shapes wave"
          src={require("assets/img/waves.png")}
        />
        <img
          alt="..."
          className="shapes squares"
          src={require("assets/img/patrat.png")}
        />
        <img
          alt="..."
          className="shapes circle"
          src={require("assets/img/cercuri.png")}
        />
        <ToastContainer />
        {cargandoBanda ? <Spinner /> :
          <div className="container">
            <div className="col body-recital " >
              <div className="col pl-1 mw-800">
                <h1 className="fuente-precentaciones titulo text-center text-white mb-2">{banda.nombre}</h1>
              </div>
                <div className="d-flex justify-content-center mb-2"> 
                  {banda.getGeneros().map(genero => {
                    return <a className="btn-simple btn-round btn btn-primary focus-pointer" href={"/BandasPage/" + genero} id={genero} key={genero} ><i className="tim-icons icon-tag mr-2"></i>{genero}</a>
                  }
                  )}
                </div>
            </div>
            <div className="col pl-0 mw-800 d-flex justify-content-center">
                <img alt="..." className="img-fluid" src={banda.imagen} />
            </div>
            <div className="col pl-1 mt-3 mw-800">
                <p className="text-center text-white mb-2 descripcio-text">{banda.info}</p>
            </div>

            <h4 className="mb-1">Generos:</h4>
                {banda.getGeneros().map(genero => {
                  return <a className="focus-pointer mr-2" href={"/BandasPage/" + genero} id={genero} key={genero} >{genero}</a>
                }
                )}
            <br></br>
            <br></br>
            <br></br>
            {banda.material.map(m => {
              if(m.tipoMaterial === "TIPO_VIDEO"){
                  return( 
                  <div className="videoDiv">
                    <iframe
                      width="600"
                      height="400"
                      src={m.url}
                      frameBorder="0"
                      allow="encrypted-media"
                      allowFullScreen
                      title="vidtitle"
                    />
                  </div>     
                )} else {
                  return (
                    <div>
                      <h4 className="mb-1">AlBUM:</h4>
                      <a className="focus-pointer mr-3" href={m.url}> Descargar Album</a>
                    </div>
                  )}
            })
            }
              
          </div>
        }
        <br></br>
        <br></br>
        <br></br>
        
      </div>
    </>
  );

}

export default withRouter(DetallesBandaPage);