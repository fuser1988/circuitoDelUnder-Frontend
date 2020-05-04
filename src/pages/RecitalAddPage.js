import React from "react";
import RecitalesNavbar from "components/Navbars/RecitalesNavbar.js";
import RecitalesHeader from "components/header/RecitalesHeader.js";


class RecitalAddPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
            id:'',
            nombre: '',
            descripcion: '',
            bandas:[],
            fecha: '',
            hora: '',
            generos: [],
            direccion: '',
            localidad: '',
            lugar: '',
            imagen:'',
            precio:0, 
            
        };
         
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log(event.target.value);
        console.log(this.state.generos.length)
    }

    render() {
        return (
            <>
                <RecitalesNavbar />
                <RecitalesHeader />
            <div>
                <h2 className="text-center">Add Rectial</h2>
                <form>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" placeholder="nombre" name="nombre" className="form-control" required value={this.state.nombre} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Descripción:</label>
                    <input type="text" placeholder="descripción" name="descripcion" className="form-control" required value={this.state.descripcion} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Bandas:</label>
                    <input type="text" placeholder="bandas ej: banda1, banda2" name="bandas" className="form-control" required value={this.state.bandas} onChange={this.onChange}/>
                </div>
                
                <div className="form-group">
                    <label>Fecha:</label>
                    <input type="date" name="fecha" className="form-control" required value={this.state.fecha} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Hora:</label>
                    <input type="text" placeholder="hh/mm/ss"name="hora" className="form-control" data-parse="time" pattern="\d{2}\/\d{2}/\d{2}" required value={this.state.hora} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Generos:</label>
                    <input type="text" placeholder="generos" className="form-control" required value={this.state.generos} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Dirección:</label>
                    <input type="text" placeholder="dirección ej. calle altura" name="direccion" className="form-control" required value={this.state.direccion} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Localidad:</label>
                    <input type="text" placeholder="localidad" name="localidad" className="form-control" required value={this.state.localidad} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Lugar:</label>
                    <input type="text" placeholder="lugar" name="lugar" className="form-control" required value={this.state.lugar} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Imagen:</label>
                    <input type="text" placeholder="imagen" name="imagen" className="form-control" value={this.state.imagen} onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Precio:</label>
                    <input type="number" placeholder="precio" name="precio" className="form-control" required value={this.state.precio} onChange={this.onChange}/>
                </div>

                <button className="btn btn-text-center" onClick={this.saveRecital}>Save</button>
                <button className="btn btn-text-center" onClick={this.cancelar}>Cancelar</button>
                
                </form>
             </div>
        );
            </>
        );
    }
}

export default RecitalAddPage;