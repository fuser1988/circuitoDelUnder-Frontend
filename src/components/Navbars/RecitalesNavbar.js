import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {UserContext} from "context/UserContext.js";


import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

function RecitalesNavBar(props) {

  const {user, setUser} = useContext(UserContext);
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [collapseOut, setCollapseOut] = useState(true);
  const [color, setColor] = useState("navbar-transparent");

  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return ()=>{
      window.removeEventListener("scroll", changeColor);
    }
  }, []);

  const changeColor = () => {
    if (document.documentElement.scrollTop > 99 ||document.body.scrollTop > 99 ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };

  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen( !collapseOpen);
  };

  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };

  const onCollapseExited = () => {
    setCollapseOut("");
  };

  const scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  const responseFacebook = (response) => {
    setUser( response );
    console.log(response);
  }

  const componentClicked = () => {
    console.log("Clicked!")
  }

  const logout = (e) => {
    setUser( null );
    e.preventDefault();
    window.FB.logout();
  }

  const falloLogin = () => {
    setUser( null );
  }

  return (
    <Navbar
      className={"fixed-top " + color}
      color-on-scroll="100"
      expand="lg"
      >
      <Container>
        <div className="navbar-translate">
          <div className="row d-flex align-items-center">
            <img
              alt="..."
              className="img-center img-fluid rounded-circle icon mr-2"
              src={require("assets/img/circuito2.png")}
              />


            <NavbarBrand
              to="/"
              tag={Link}
              id="navbar-brand"
              className="font-nav new-rock-font "
              >
              Circuito del under
              </NavbarBrand>

          </div>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            vivi la musica under donde vallas
            </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
            >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
          >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#circuito" onClick={e => e.preventDefault()}>
                  BLK•React
                  </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                  >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                href="#pablo"
                nav
                onClick={e => e.preventDefault()}
                >
                <i className="fa fa-cogs d-lg-none d-xl-none" />
                  Menu
                </DropdownToggle>
              <DropdownMenu className="dropdown-with-icons">
                <DropdownItem href="https://demos.creative-tim.com/blk-design-system-react/#/documentation/tutorial">
                  <i className="tim-icons icon-paper" />
                    Documentation
                  </DropdownItem>
                <DropdownItem tag={Link} to="/register-page">
                  <i className="tim-icons icon-bullet-list-67" />
                    Register Page
                  </DropdownItem>
                <DropdownItem tag={Link} to="/landing-page">
                  <i className="tim-icons icon-image-02" />
                    Landing Page
                  </DropdownItem>
                <DropdownItem tag={Link} to="/profile-page">
                  <i className="tim-icons icon-single-02" />
                    Profile Page
                  </DropdownItem>
                <DropdownItem tag={Link} to="/recital-add">
                  <i className="tim-icons icon-triangle-right-17" />
                    Add Recital
                  </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              {!user ? (
                <FacebookLogin
                  appId="222983722267666"
                  onFailure={falloLogin}
                  callback={responseFacebook}
                  fields="name,email,picture"
                  render={renderProps => (
                    <Button onClick={renderProps.onClick}>Ingresar</Button>
                    )}
                    
                    />) : (<Button onClick={(e) => { logout(e) }}>Salir</Button>)
                  }
            </NavItem>

          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default RecitalesNavBar;
