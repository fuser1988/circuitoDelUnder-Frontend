import React from "react";

import InfoPage from "./InfoPage";
import ErrorServerMessage from "components/body/ErrorServerMessage.js";

class ErrorServerPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      error: props.error,
      status: '',
      titulo: '',
      message:'',
    }
    this.componentDidMount = this.componentDidMount(this)
  }
  
  componentDidMount() {
    if (this.state.error === undefined) {
      /*this.setState({titulo: "UPS, SERVIDOR CAÍDO"}, 
      {message: "Ocurrió un error en el servidor"})*/
      
      this.state.titulo = "UPS, SERVIDOR CAÍDO";
      this.state.message = "Ocurrió un error en el servidor"
    }else{
      this.state.status = this.state.error.status;
      this.state.titulo = "SERVER ERROR";
      this.state.message = "Ocurrió un error en el servidor"
    }

  }

  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }
  
  render() {
    return (
      <>
          <InfoPage>
              <ErrorServerMessage status={this.state.status} titulo={this.state.titulo} message={this.state.message}/>
          </InfoPage>
      </>
    );
  }
}
export default ErrorServerPage;