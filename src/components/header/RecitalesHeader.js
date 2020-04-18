import React from "react";

import { Container } from "reactstrap";

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
        className="page-headers page-header-xs"
        data-parallax={true}
        ref={pageHeader}
      >
        {/* <div className="filter" /> */}

        <Container className="items-center">
          <h2>
            Circuito del Under
          </h2>

        </Container>
      </div>
    </>
  );
}

export default RecitalesHeader;