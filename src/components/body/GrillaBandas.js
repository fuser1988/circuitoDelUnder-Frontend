import React from "react";
import BandaCard from '../card/BandaCard';

class GrillaBandas extends React.Component {

    render() {
        return (
            <>
                <div className="row">
                    {this.props.bandas.map(banda => {
                        return <BandaCard banda={banda} />
                    })}
                </div>
            </>
        );
    }

}

export default GrillaBandas;