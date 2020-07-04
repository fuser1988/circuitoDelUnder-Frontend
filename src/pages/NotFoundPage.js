import React from "react";

import InfoPage from "./InfoPage";
import NotFoundMessage from "components/body/NotFoundMessage.js";

class NotFoundPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      status: this.props.match.params.status,
      message: this.props.match.params.message,
      titulo: this.props.match.params.titulo,
    }
  }

  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  render() {
    return (
      <>
          <InfoPage>
              <NotFoundMessage status={this.state.status} titulo={this.state.titulo} message={this.state.message}/>
          </InfoPage>
      </>
    );
  }
}
export default NotFoundPage;