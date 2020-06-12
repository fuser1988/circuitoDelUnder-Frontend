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

const OPTIONS = {
    center: {
        lat: -34.481620,
        lng: -58.522587
    },
    zoom: 16
}

const UbicacionMapForm = (props) => {

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
            var map =  new googleMaps.Map(document.getElementById('map'), OPTIONS);
            map.addListener('click', function(e) {
                const myLatLng = {lat: e.latLng.lat(), lng: e.latLng.lng()};
                new googleMaps.Marker({
                    position:myLatLng,
                    map: map,
                });
                map.panTo(myLatLng)
                const ubicacion = {latitud: myLatLng.lat, longitud: myLatLng.lng}
                props.accion('ubicacion', ubicacion)
            });
        }).catch(err => {
            console.warning('Something went wrong loading the map', err);
        });
    }

    return (
            <div id="map" style={MAP_STYLES}></div>
        )
    
}

export default UbicacionMapForm;