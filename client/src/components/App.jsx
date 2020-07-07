import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    const initMap = () => {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.314599, lng: -96.139676},
        zoom: 5,
        gestureHandling: 'none',
        // zoomControl: false,
        // mapTypeControlOptions: { mapTypeIds: [] },
        disableDefaultUI: true,
        draggableCursor: 'default',
        styles: [
          {
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "featureType": "poi",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
        ]
      });
    
      map.data.loadGeoJson('http://localhost:3000/map');

      map.data.setStyle(function(feature) {
        return ({
          strokeColor: 'green',
          strokeWeight: 3
        });
      });

      map.data.addListener('click', function(event) {
        let latLngComma = event.latLng.toString().indexOf(',')
        let latLng = {
          lat: Number(event.latLng.toString().slice(1, latLngComma)) - .9,
          lng: Number(event.latLng.toString().slice(latLngComma + 2, -1))
        }
        new google.maps.Marker({
          position: latLng,
          map: map,
          icon: './images/circle.gif',
        });
      });
    };

    window.initMap = initMap.bind(this);
  }

  render() {
    return (
      <div id="map"></div>
    )
  }
};

export default App;