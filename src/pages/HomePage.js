import React from "react";

import RecitalesNavba from "components/Navbars/RecitalesNavbar.js";
import HomeBody from "components/body/HomeBody.js";

class HomePage extends React.Component {
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
        <div className="wrapper">
          <HomeBody />
        </div>
      </>
    );
  }
}

export default HomePage;
