import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

class RowForm extends React.Component {
    constructor(props) {
        super(props);
          this.state = {
          validate: this.props.invalid,
        }
      }

    update(event){
        this.setState({validate:false})
        this.props.accion(this.props.propertyName, event)
    }

    render(){
        return (
            <FormGroup className="grilla-Responsive offset-md-2 col-10 form">
              <Label className="col-3 col-form-label">{this.props.label}</Label>
              <Input
                type={this.props.type}
                placeholder={this.props.placeholder}
                value={ this.props.property }
                invalid={this.state.validate}
                onChange={event => this.update(event)}
              />
              <FormFeedback>
                Se Requiere Completar el Campo.
              </FormFeedback>
            </FormGroup>



          );
    }
}

export default RowForm;

