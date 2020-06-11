import React from "react";

import {Table} from "reactstrap";

function TablaMateriales (props) {
    
    return(
        <>
        <Table borderless>
                      {props.listaDeMaterial.length > 0 && <thead>
                            <tr>
                            <th>Descripcion</th>
                            <th>Tipo</th>
                            <th>Quitar</th>
                            </tr>
                        </thead>}
                        <tbody>
                        {props.listaDeMaterial.map(material => {
                            return( 
                                <tr>
                                    <td>{material.comentario}</td>
                                    <td>{material.tipoMaterial.substring(5)}</td>
                                    <td id={material.url}><a className="ml-3" href="###" onClick={(event) => {props.quitarMaterial(event)}} ><i className="tim-icons icon-trash-simple"></i></a></td>
                                </tr>
                            )})
                        }
                            
                        </tbody>
                     </Table>
    </>
    )

}   

export default TablaMateriales;