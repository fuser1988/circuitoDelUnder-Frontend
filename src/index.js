import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/css/circuito-del-under.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import HomePage from "pages/HomePage.js";
import RecitalesPage from "pages/RecitalesPage.js";
import PoliticaDePrivacidadPage from "pages/PoliticaDePrivacidadPage.js";

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={props => <HomePage {...props} />} />
      <Route path="/RecitalesPage/:busqueda" render={props => <RecitalesPage {...props} />} />
      <Route path="/components" render={props => <Index {...props} />} />
      <Route path="/politica-privacidad" render={props => <PoliticaDePrivacidadPage {...props} />} />
      <Redirect from="/" to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);


serviceWorker.unregister();
