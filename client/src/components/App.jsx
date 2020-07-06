import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: ''
    }
    this.setStates = this.setStates.bind(this)
  }

  setStates(state) {
    this.setState({
      state
    })
  }

  componentDidMount() {
    // const script = document.createElement("script")
    // script.src = `https://maps.googleapis.com/maps/api/js?key="${process.env.GOOGLE_MAPS_API_KEY}"&callback=initMap`
    // document.body.appendChild(script);  
    let state;

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
    
      // var infowindow = new google.maps.InfoWindow();
      
      map.data.setStyle(function(feature) {
        if (feature.getProperty('isPurple')) {
          return ({
            strokeColor: 'green',
            fillColor: 'purple',
            // strokeWeight: 3
          });
        }
        return ({
          strokeColor: 'green',
          strokeWeight: 3
        });
      });

      // map.data.addListener('click', function(event) {
      //   event.feature.setProperty('isPurple', true);
      // });

      // map.data.addListener('mouseout', function(event) {
      //   map.data.revertStyle();
      // });

      map.data.addListener('click', function(event) {
        event.feature.setProperty('isPurple', !event.feature.getProperty('isPurple'));
        state = event.feature.getProperty('NAME')
        console.log(event.feature)
        setState(state)
        // let state = event.feature.getProperty('NAME');
        // infowindow.setContent(state); // show the html variable in the infowindow
        // infowindow.setPosition(event.latLng); // anchor the infowindow at the marker
        // infowindow.open(map);
      });
       

      // let stateCoordinates = [
      //   {lat: 44.500000, lng: -89.500000},
      //   {lat: 39.000000, lng: -80.500000},
      //   {lat: 44.000000, lng:	-72.699997},
      //   {lat: 31.000000, lng:	-100.000000},
      //   {lat: 44.500000, lng:	-100.000000},
      // ]
  
      // const addUserMarkers = () => {
      //   stateCoordinates.forEach(state => {
      //     new google.maps.Marker({
      //       position: state,
      //       map: map,
      //       icon: './images/marker3.gif',
      //     });
      //   })
      // }
      // addUserMarkers()
    };
    const setState = (state) => {
      this.setState({
        state
      })
    }

    window.initMap = initMap.bind(this);
  }

  render() {
    // if (this.state.state) {
    //   return <div id="app" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '200px', color: 'green'}}>{this.state.state}</div>
    // }
    return (
      <div id="map"></div>
    )
  }
};

export default App;