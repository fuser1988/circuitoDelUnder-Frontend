import React, { useState } from "react";

import RecitalesNavba from "components/Navbars/RecitalesNavbar.js";

import { useRecitalService } from "services/RecitalService.js";
import Spinner from "components/spinner/Spinner.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";
import Recital from "model/Recital.js";

import {Modal, ModalFooter, Button, ModalHeader, ModalBody} from 'reactstrap';

import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../toast.css';
import 'moment/locale/es'
import moment from "moment";
import UbicacionMap from 'components/body/UbicacionMap.js';

function DetallesRecitalPage(props) {

  const { buscarPorId } = useRecitalService();
  const [cargandoRecitales, setcargandoRecitales] = useState(true);
  const [recital, setRecital] = useState({ bandas: [] });
  const [modal, setModal] = useState(false);

  React.useEffect(
    () => {
      document.body.classList.toggle("landing-page");
      buscarRecital();
      notificarSiCorresponde();
      return () => {
      document.body.classList.toggle("landing-page");
      }
    }, []);

  const notificarSiCorresponde = () => {
    const { match: { params } } = props;
    console.log(params.new);
    if (params.new) {
      notificar("El recital se cargó correctamente")
    }
  }

  const notificar = (mensaje) => toast(mensaje, {
    className: 'black-background',
    bodyClassName: "grow-font-size",
    progressClassName: 'fancy-progress-bar'
  });

  const buscarRecital = () => {
    const { match: { params } } = props;
    buscarPorId(params.id)
      .then((recitalObtenido) => {
        setRecital(new Recital(recitalObtenido));
        setcargandoRecitales(false);
      })
  }

  const traducirFecha = () => {
    var fechaDeRecital = moment(recital.fecha);
    moment.locale('es');
    fechaDeRecital.locale(false);
    return fechaDeRecital.format('dddd D [de] MMMM [de] YYYY');
  }

  const toggle = () =>{
    setModal(
       !modal
    );
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
        {cargandoRecitales ? <Spinner /> :
          <div className="container">
              <Modal isOpen={modal} toggle={toggle} className={props.className}>
                <ModalHeader toggle={toggle}>{recital.lugar}</ModalHeader>
                <ModalBody>
                  <UbicacionMap lugar={recital.lugar}/>
                </ModalBody>
                <ModalFooter>
                  <Button color='secondary' onClick={toggle}>Aceptar</Button>
                  </ModalFooter>
              </Modal>   
            <div className="col body-recital " >
              <div className="col pl-1 mw-800">
                <h1 className="fuente-precentaciones titulo text-center text-white mb-2">{recital.nombre}</h1>

                <p className="text-center text-white  fuente-precentaciones fecha"> {traducirFecha()}</p>
                  <p className="text-center text-white mb-3 opend-font">
                    {recital.lugar}
                  </p>
                <div className="d-flex justify-content-center mb-3"> 
                  {recital.getGeneros().map(genero => {
                    return <a className="btn-simple btn-round btn btn-primary focus-pointer" href={"/RecitalesPage/" + genero} id={genero} key={genero} ><i className="tim-icons icon-tag mr-2"></i>{genero}</a>
                  }
                  )}

                </div>

              </div>
              <div className="col pl-0 mw-800 d-flex justify-content-center">
                <img alt="..." className="img-fluid" src={recital.imagen} />
              </div>
              <div className="col pl-1 mt-3 mw-800">
                <p className="text-center text-white mb-2 descripcio-text">{recital.descripcion}</p>
              </div>
              <div className="btn-wrapper mb-3 size-font">

                <br />
                <p className="d-inline"><i className="tim-icons icon-square-pin pr-1 pb-1" aria-hidden="true"></i>{recital.lugar},</p>
                <p className="d-inline pl-1">{recital.direccion}</p>
                <p className="d-inline pl-1">{recital.localidad}</p>
                <p><i className="tim-icons icon-calendar-60 pr-1 pb-1" aria-hidden="true"></i>
                  {traducirFecha()}  {recital.hora}hs. </p>
                 <a href="##" onClick={toggle}><i className="fas fa-map-marker-alt mr-1">   </i>ver mapa</a>   
              </div>


                <h4 className="mb-1">Generos:</h4>
                {recital.getGeneros().map(genero => {
                  return <a className="focus-pointer mr-2" href={"/RecitalesPage/" + genero} id={genero} key={genero} >{genero}</a>
                }
                )}
              <div className="button-container">
                <h4 className=" mt-1 mb-1">Bandas:</h4>
                {recital.bandas.map(banda => {
                  return <a className="focus-pointer mr-2" href={"/banda/" + banda.id} key={banda.nombre} id={banda.id} >{banda.nombre}</a>
                }
                )}

              </div>
            </div>

          </div>
        }
        <br></br>
        <br></br>
        <br></br>
      </div>
    </>
  );

}

export default withRouter(DetallesRecitalPage);