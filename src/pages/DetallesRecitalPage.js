import React from "react";

import RecitalesNavba from "components/Navbars/RecitalesNavbar.js";

import {buscarPorId} from "services/RecitalService.js";

import RecitalesHeader from "components/header/RecitalesHeader.js";

import { withRouter } from "react-router-dom";

class DetallesRecitalPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recital: { bandas: [], generos: [] }
    };
    this.buscarRecital = this.buscarRecital.bind(this);
  }

  componentDidMount() {
    document.body.classList.toggle("landing-page");
    this.buscarRecital();
  }

  componentWillUnmount() {
    document.body.classList.toggle("landing-page");
  }

  async buscarRecital() {
    const { match: { params } } = this.props;
    buscarPorId(params.id)
      .then((recitalObtenido)=>{
        this.setState({ recital: recitalObtenido })
      })
  }

  render() {
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

          <div className="content-center">

            <div className="row-grid justify-content-between align-items-center text-left row" >
              <div className="col-md-6 col-lg-6">
                <h1 className="text-white">{this.state.recital.nombre}</h1>
                <p className="text-white mb-3">{this.state.recital.descripcion}</p>
                <div className="btn-wrapper">
                  <div className="button-container">
                    <h4 className="mb-1">Bandas:</h4>
                    {this.state.recital.bandas.map(banda => {
                      return <a className="focus-pointer pl-1" href="/" key={banda} >{banda}</a>
                    }
                    )}

                    <h4 className="mb-1">Generos:</h4>
                    {this.state.recital.generos.map(genero => {
                      return <a className="focus-pointer pl-1" href="#rock" key={genero} >{genero}</a>
                    }
                    )}
                  </div>
                </div>
                <div className="btn-wrapper mb-3">

                  <br />
                  <p className="d-inline"><i className="tim-icons icon-square-pin pr-1 pb-1" aria-hidden="true"></i>{this.state.recital.lugar},</p>
                  <p className="d-inline pl-1">{this.state.recital.direccion}</p>
                  <p className="d-inline pl-1">{this.state.recital.localidad}</p>
                  <p><i className="tim-icons icon-calendar-60 pr-1 pb-1" aria-hidden="true"></i>
                    {this.state.recital.fecha}  {this.state.recital.hora}hs. </p>

                </div>

              </div>
              <div className="col-md-6 col-lg-6">
                <img alt="..." class="img-fluid" src={this.state.recital.imagen} />
              </div>
            </div>

          </div>

        </div>
      </>
    );
  }
}

export default withRouter(DetallesRecitalPage);
