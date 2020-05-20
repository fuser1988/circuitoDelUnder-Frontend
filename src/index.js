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
import {UserProvider} from "context/UserContext.js";

import * as serviceWorker from './serviceWorker';
import ErrorServerPage from "./pages/ErrorServerPage";
import NotFoundPage from "./pages/NotFoundPage";
import ConfirmacionCuentaPage from "./pages/ConfirmacionCuentaPage";
import NuevaBandaPage from "./pages/NuevaBandaPage";



ReactDOM.render(
  <UserProvider>
    <BrowserRouter forceRefresh={true}>
      <Switch>
        <Route path="/index" render={props => <HomePage {...props} />} />
        <Route path="/RecitalesPage/:busqueda" render={props => <RecitalesPage {...props} />} />
        <Route path="/components" render={props => <Index {...props} />} />
        <Route path="/Recital/:id/:new" render={props => <DetallesRecitalPage {...props} />} />
        <Route path="/Recital/:id" render={props => <DetallesRecitalPage {...props} />} />
        <Route path="/politica-privacidad" render={props => <PoliticaDePrivacidadPage {...props} />} />
        <Route path="/recital-add" render={props => <RecitalAddPage {...props} />} />
        <Route path="/login" render={props => <RegisterPage {...props} />} />
        <Route path="/serverError" render={props => <ErrorServerPage {...props} />} />
        <Route path="/notFound" render={props => <NotFoundPage {...props} />} />
        <Route path="/confirmaciones-de-cuentas" render={props => <ConfirmacionCuentaPage {...props} />} />
        <Route path="/formularioNuevaBanda" render={props => <NuevaBandaPage {...props} />} />
        <Redirect from="/" to="/index" />
      </Switch>
    </BrowserRouter>
  </UserProvider>,
  document.getElementById("root")
);


serviceWorker.unregister();
