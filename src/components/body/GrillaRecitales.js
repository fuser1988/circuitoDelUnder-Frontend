import React from 'react';
import RecitalCard from '../card/RecitalCard';

class GrillaRecitales extends React.Component {

    render() {
        return <>

            {this.props.recitales.map(recital => {
                return <RecitalCard recital = {recital} key={recital.id}/>
            })}
        </>
    }
}

export default GrillaRecitales;