import React from 'react';
import loadGoogleMapsAPI from 'load-google-maps-api'; // Única dependencia extra

// es muy importante añadirle height y width!!!
const MAP_STYLES = {
    height: '450px',
    width: '100%'
}

const API_CONFIG = {
    key: 'AIzaSyDAuIBs1Jon6yWwS-O7mg_1q8EH1M9jl8o',
    language: 'es'
}

const UbicacionMap = (props) => {

    const OPTIONS = {
        center: {
            lat: props.ubicacion.latitud,
            lng: props.ubicacion.longitud
        },
        zoom: 16
    }

    React.useEffect(() => {
        componentDidMount()
        return (() => {
            componentWillUnmount();
        })
    }, []);

    const componentWillUnmount = () => {
        // limpiando despues el component ya no es usado
        // evita errores en la console
        const allScripts = document.getElementsByTagName('script');
        // recopilar todos los scripts,
        // filtrar los que contengan la key en 'src'
        // eliminarlo
        [].filter.call(
            allScripts,
            (scpt) => scpt.src.indexOf('key=AIzaSyDAuIBs1Jon6yWwS-O7mg_1q8EH1M9jl8o') >= 0
        )[0].remove();
        // resetear la variable de Google
        window.google = {};
    }

    const componentDidMount = () => {
        // Promise para que al ser resulta puedas manipular
        // las opciones de Google Maps
            
        loadGoogleMapsAPI(API_CONFIG).then(googleMaps => {
            const myLatLng = {lat: props.ubicacion.latitud, lng: props.ubicacion.longitud};
            var map =  new googleMaps.Map(document.getElementById('map'), OPTIONS);
            new googleMaps.Marker({
                position: myLatLng,
                map: map,
                title: props.ubicacion
                });
            
                new googleMaps.InfoWindow({
                content: 'Dirección: ' +props.direccion
                            +', Localidad: ' +props.localidad, position: myLatLng
            }).open(map)

        }).catch(err => {
            console.warning('Something went wrong loading the map', err);
        });     
    }

    return (
            <div id="map" style={MAP_STYLES}></div>
        )
    
}

export default UbicacionMap;