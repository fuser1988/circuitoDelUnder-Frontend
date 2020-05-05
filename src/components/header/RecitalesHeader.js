import React from "react";

import { Container } from "reactstrap";

import SearchComponent from "components/search/SearchComponent.js";

function RecitalesHeader(props) {
  let pageHeader = React.createRef();
 
  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/equipos6.png") + ")"
        }}
        className="custom-size-header d-flex align-items-end"
        data-parallax={true}
        ref={pageHeader}
      >

        <Container className="">
 
            <div class="col-12">
                <SearchComponent/>
            </div>
          
        </Container>
      </div>
    </>
  );
}

export default RecitalesHeader;