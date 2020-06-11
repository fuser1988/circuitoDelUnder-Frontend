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

const UbicacionMap = () => {

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
        if (navigator.geolocation) {
            loadGoogleMapsAPI(API_CONFIG).then(googleMaps => {
                navigator.geolocation.getCurrentPosition((position) => {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    var OPTIONS = {
                        center: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                        zoom: 16
                    }
                    
                    var map = new googleMaps.Map(document.getElementById('map'), OPTIONS);
                    
                    new googleMaps.Marker({
                        position: pos,
                        map: map,
                        });
                
                    new googleMaps.InfoWindow({
                        content: pos.lat+', '   + pos.lng, position: pos
                    }).open(map)    
                }   
                
                )

                
            }).catch(err => {
                    console.warning('Something went wrong loading the map', err);
                });
        }else {}
    }

    return (
            <div id="map" style={MAP_STYLES}></div>
        )
    
}

export default UbicacionMap;