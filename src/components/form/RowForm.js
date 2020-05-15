import React from 'react';

class RowForm extends React.Component {
    
    update(event){
        this.props.accion(this.props.propertyName, event)
    }

    render(){
        return (
            <div className="">
              <label className="col-3 col-form-label">{this.props.label}</label>
              <div className="col-10">
                  <input type={this.props.type} placeholder={this.props.placeholder} className="form-control" required value={this.props.property} onChange={event => this.update(event)} />
              </div>
              </div>
          );
    }
}

export default RowForm;

