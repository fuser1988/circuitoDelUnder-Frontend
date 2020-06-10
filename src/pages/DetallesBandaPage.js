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
import { Row, Card, CardBody, CardTitle } from "reactstrap";

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
      notificar("La banda se cargó correctamente")
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
      })
  }

  const crearVideo = (video) => {
    return(
      <div className="container-video">
      <iframe className="video"
        height="400"
        src={video.url}
        frameBorder="0"
        allow="encrypted-media"
        allowFullScreen
        title="vidtitle"
      />
      <p className="text-center text-white mb-2 descripcio-text">{video.comentario}</p>
      
      </div>
    )
  }

  const crearVideos = (videos) => {
    return ( 
      <Row>
        {videos.map(video => {
          if (video.tipoMaterial === "TIPO_VIDEO") {
            return crearVideo(video)
          }
        })}
      </Row>     
    )
  }

  const mostrarVideos = (videos) => {
    if (videos.length !== 0) {
      return (
        <div>
          <h2 className="text-white">Material Visual</h2>
          {crearVideos(videos)}
        </div> 
      )
    }else {
      return(
        <div>
          <h2 className="text-white">No Hay Material Visual</h2>
        </div>
      )
    }
  }

  const crearVideos2 = (videos) => {
    return(
      <Row>
        {videos.map(video => {
          if (video.tipoMaterial === "TIPO_VIDEO") {
            return(
              <Card >
              <iframe className="video"
                height="400"
                src={video.url}
                frameBorder="0"
                allow="encrypted-media"
                allowFullScreen
                title="vidtitle"
              />
              <CardTitle className="mt-2 mb-0 text-center bold-text">
                <p className="text-center text-white mb-2 descripcio-text">{video.comentario}</p>
              </CardTitle>
              </Card>
            )
          }
        })}
      </Row>
    )
  } 
      
  const crearAlbum = (album) => {
    return(
      <Card className="mt-2 ml-2 col-3 responsive-card">
        <CardTitle className="mt-2 mb-0 text-center bold-text">
          <a className="focus-pointer" href={album.url}>{album.comentario}</a>
        </CardTitle>
      </Card>
    )  
  }

  const crearAlbumes = (albumes) => {
    return (
      <Row>
        {albumes.map(album => {
          if (album.tipoMaterial === "TIPO_ALBUM") {
            return crearAlbum(album)
          }
        })
        }
      </Row>
    )
  }

  const mostrarMaterialDescargable = (albumes) => {
    if (albumes.length !== 0) {
      return (
        <div>
          <h2 className="text-white">Material Descargable</h2>
          {crearAlbumes(albumes)}
        </div> 
      )
    }else {
      return(
        <div>
          <h2 className="text-white">No Hay Material Descargable</h2>
        </div>
      )
    }
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
                <div className="d-flex justify-content-center mb-2 mw-800"> 
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
            <br></br>
            <br></br>
            <div className="">
              <h4 className="mb-1">Generos:</h4>
                  {banda.getGeneros().map(genero => {
                    return <a className="focus-pointer mr-2" href={"/BandasPage/" + genero} id={genero} key={genero} >{genero}</a>
                  }
                  )}
            </div>
            
            <br></br>
            <br></br>
            <br></br>

            <div className="grilla-Responsive mw-800">
              {crearVideos2(banda.material)} 
            </div>
            
            <br></br>
            <br></br>

            {/* <div className="grilla-Responsive offset-md-1 col-10">
              {mostrarMaterialDescargable(banda.material)}
            </div> */}

             
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