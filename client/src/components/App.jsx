import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: ''
    }
  }

  componentDidMount() {
    const initMap = () => {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.314599, lng: -96.139676},
        zoom: 5,
        gestureHandling: 'none',
        zoomControl: false,
        mapTypeControlOptions: { mapTypeIds: [] },
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
                "color": "#000000"
              },
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "visibility": "on"
              },
              {
                "weight": 1.5
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "visibility": "on"
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
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#2c2c2c"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8a8a8a"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#373737"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#3c3c3c"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#4e4e4e"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
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
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#3d3d3d"
              }
            ]
          }
        ]
      });
    
      map.data.loadGeoJson('http://localhost:3001/');
    
      map.data.setStyle(function(feature) {
        let stateColor
        if (feature.getProperty('positiveIncrease') > 1000) {
          stateColor = 'red'
        }
        if (feature.getProperty('positiveIncrease') < 1000 && feature.getProperty('positiveIncrease') > 100) {
          stateColor = 'orange'
        }
        if (feature.getProperty('positiveIncrease') < 100) {
          stateColor = 'yellow'
        }
        if (feature.getProperty('positiveIncrease') === 0) {
          stateColor = 'blue'
        }
        return ({
          strokeColor: 'green',
          fillColor: stateColor,
          strokeWeight: 3
        });
      });
          map.data.addListener('click', (event) => {
            alert(
              event.feature.getProperty('STUSPS') + ": \n" + 
              'Total positive cases: ' + event.feature.getProperty('positive') + '\n' +
              'Increase of positive cases: ' + event.feature.getProperty('positiveIncrease') + '\n' +
              'Total deaths: ' + event.feature.getProperty('death') + '\n' +
              'Last updated: ' + event.feature.getProperty('lastUpdated')
          )})
    }
    
    window.initMap = initMap.bind(this);
  }

  render() {
    return (
      <div id="map"></div>
    )
  }
};

export default App;