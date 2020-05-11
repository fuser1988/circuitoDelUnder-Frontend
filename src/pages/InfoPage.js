import React from "react";

import {Container} from "reactstrap";


class InfoPage extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
        <div className="wrapper">
          <div className="page-header header-filter">
            <div className="squares square1" />
            <div className="squares square2" />
            <div className="squares square3" />
            <div className="squares square4" />
            <div className="squares square5" />
            <div className="squares square6" />
            <div className="squares square7" />
            <Container>
              <div className="content-center brand aling">
                  {this.props.children}
              </div>
            </Container>
          </div>


        </div>
      </>
    );
  }
}

export default InfoPage;