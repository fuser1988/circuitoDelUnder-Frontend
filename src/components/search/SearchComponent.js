import React, { Component } from 'react';

import {
  InputGroup,
  Col,
  InputGroupAddon,
  Input,
  Button,
  Container
} from "reactstrap";

import { withRouter } from "react-router-dom";

class SearchBars extends Component {

  constructor(props) {
    super(props);
    this.state = { busqueda: "" };
    this.updateInput = this.updateInput.bind(this);
    this.redirecSearch = this.redirecSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  updateInput(event) {
    this.setState({ busqueda: event.target.value });
  }

  redirecSearch() {
    this.props.history.push("/RecitalesPage/" + this.state.busqueda);
    this.setState({busqueda:""});
  }


  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.redirecSearch();
    }
  }

  render() {
    return (
      <Container>
        <InputGroup>
          <Col className="resize-search offset-2 col-8 mt-4">
            <InputGroupAddon className="d-flex align-items-center" addonType="append">
              <Input className="form-control" placeholder="" type="text" value={this.state.busqueda} onChange={this.updateInput} onKeyPress={this.handleKeyPress} ></Input>
              <Button className="btn btn-text-center" onClick={this.redirecSearch} >
                Buscar
              </Button>
            </InputGroupAddon>
          </Col>
        </InputGroup>
      </Container >
    );
  }

}

export default withRouter(SearchBars);