import React from 'react';

class RowForm extends React.Component {
    
    update(event){
        this.props.accion(this.props.propertyName, event)
    }

    render(){
        return (
            <div>
              <label className="col-3 col-form-label">{this.props.label}</label>
              <div className="col-9">
                  <input type={this.props.type} placeholder={this.props.placeholder} className="form-control" required value={this.props.property} onChange={event => this.update(event)} />
              </div>
              </div>
          );
    }
}

export default RowForm;

