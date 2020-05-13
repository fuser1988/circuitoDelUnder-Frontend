import React from "react";

import InfoPage from "./InfoPage";
import NotFoundMessage from "components/body/NotFoundMessage.js";

class NotFoundPage extends React.Component {
  
  componentDidMount() {
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
          <InfoPage>
              <NotFoundMessage/>
          </InfoPage>
      </>
    );
  }
}
export default NotFoundPage;