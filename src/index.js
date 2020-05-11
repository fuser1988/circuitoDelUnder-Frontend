import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/css/circuito-del-under.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import RegisterPage from "views/examples/RegisterPage.js";
import HomePage from "pages/HomePage.js";
import DetallesRecitalPage from "pages/DetallesRecitalPage.js";
import RecitalesPage from "pages/RecitalesPage.js";
import PoliticaDePrivacidadPage from "pages/PoliticaDePrivacidadPage.js";
import RecitalAddPage from "pages/RecitalAddPage.js";

import * as serviceWorker from './serviceWorker';
import ErrorServerPage from "./pages/ErrorServerPage";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={props => <HomePage {...props} />} />
      <Route path="/RecitalesPage/:busqueda" render={props => <RecitalesPage {...props} />} />
      <Route path="/components" render={props => <Index {...props} />} />
      <Route path="/Recital/:id" render={props => <DetallesRecitalPage {...props} />} />
      <Route path="/politica-privacidad" render={props => <PoliticaDePrivacidadPage {...props} />} />
      <Route path="/recital-add" render={props => <RecitalAddPage {...props} />} />
      <Route path="/login" render={props => <RegisterPage {...props} />} />
      <Route path="/serverError" render={props => <ErrorServerPage {...props} />} />
      <Redirect from="/" to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);


serviceWorker.unregister();
