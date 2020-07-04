import React from 'react';
import { Input } from "reactstrap";

const MAP_STYLES = {
  height: '450px',
  width: '100%'
}

let markerActual;

const UbicacionMapForm = (props) => {

  React.useEffect(() => {
      componentDidMount()
      return (() => {
      })
  }, []);


  const componentDidMount = () => {
    
    console.log(window.google);
    var map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.804979, lng: -58.278897},
    zoom: 16,
    mapTypeId: 'roadmap'
    });
		  
		map.addListener('click', function(event) {
      if(markerActual){
          markerActual.setMap(null);        

      }
      const myLatLng = {lat: event.latLng.lat(), lng: event.latLng.lng()};
      markerActual = new window.google.maps.Marker({
          position:myLatLng,
          map: map,
      });

      map.panTo(myLatLng);
      const ubicacion = {latitud: myLatLng.lat, longitud: myLatLng.lng};
      props.accion('ubicacion', ubicacion)
    });
        
    var input = document.getElementById('pac-input');
    var searchBox = new window.google.maps.places.SearchBox(input);
  
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });
  
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
  
      var bounds = new window.google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        
        if (place.geometry.viewport) {

          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
      });     
  }

    return (
      <>
        <Input id="pac-input" className="controls mb-4" type="text" placeholder="Ubicación"/>
        <div id="map" style={MAP_STYLES}></div>
      </>
        )
}

export default UbicacionMapForm;