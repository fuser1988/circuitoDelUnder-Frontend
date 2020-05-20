import React from "react";

import {Container} from "reactstrap";
import RecitalesNavba from "components/Navbars/RecitalesNavbar.js";


class TemplateFormPage extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
        <RecitalesNavba />
        <Container>
            {this.props.children}
        </Container>
      </>
    );
  }
}

export default TemplateFormPage;