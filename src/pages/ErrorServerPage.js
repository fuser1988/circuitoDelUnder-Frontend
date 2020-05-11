import React from "react";

import InfoPage from "./InfoPage";
import ErrorServerMessage from "components/body/ErrorServerMessage.js";

class ErrorServerPage extends React.Component {
  
  componentDidMount() {
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
          <InfoPage>
              <ErrorServerMessage/>
          </InfoPage>
      </>
    );
  }
}
export default ErrorServerPage;