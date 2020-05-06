import React from 'react';
import RecitalCard from '../card/RecitalCard';

class GrillaRecitales extends React.Component {

    render() {
        return <>
            <div className="row">
                {this.props.recitales.map(recital => {
                    return <RecitalCard recital={recital} key={recital.id}/>
                })}
            </div>
        </>
    }
}

export default GrillaRecitales;