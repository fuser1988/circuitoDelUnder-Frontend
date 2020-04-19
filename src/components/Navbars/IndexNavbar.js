import React from "react";
import { Link } from "react-router-dom";

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

class RecitalesNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }
  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out"
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: ""
    });
  };
  scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };
  responseFacebook = (response) => {
    this.setState({ user: response });
    console.log(response);
  }

  componentClicked = () => {
    console.log("Clicked!")
  }

  logout = (e) => {
    this.setState({ user: null });
    e.preventDefault();
    window.FB.logout();
  }

  falloLogin = () => {
    this.setState({ user: null });
  }

  render() {
    return (
      <Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              to="/"
              tag={Link}
              id="navbar-brand"
            >
              Circuito del under
            </NavbarBrand>
            <UncontrolledTooltip placement="bottom" target="navbar-brand">
              vivi la musica under donde vallas
            </UncontrolledTooltip>
            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    BLK•React
                  </a>
                </Col>
                <Col className="collapse-close text-right" xs="6">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
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
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                {!this.state.user ? (
                  <FacebookLogin
                    appId="222983722267666"
                    onFailure={this.falloLogin}
                    callback={this.responseFacebook}
                    render={renderProps => (
                      <Button onClick={renderProps.onClick}>Ingresar</Button>
                    )}

                  />) : (<Button onClick={(e) => { this.logout(e) }}>Salir</Button>)
                }
              </NavItem>
              
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default RecitalesNavBar;
