import React from 'react';
import axios from 'axios';

const date = new Date()
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: date,
      formattedDate: '' + date.getFullYear() + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    }
    this.changeDate = this.changeDate.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    map.data.forEach(function(feature) {
      map.data.remove(feature);
    });
    map.data.loadGeoJson(`http://localhost:3000/map?date=${this.state.formattedDate}`);
  }

  componentDidMount() {
    const initMap = () => {
      global.map = new google.maps.Map(document.getElementById('map'), {
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
      map.data.loadGeoJson(`http://localhost:3000/map?date=${this.state.formattedDate}`);
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
          strokeColor: stateColor,
          fillColor: stateColor,
          // strokeWeight: 3,
          fillOpacity: 1
        });
      });

      map.data.addListener('click', (event) => {
        alert(
          event.feature.getProperty('STUSPS') + ": \n" + 
          'Total positive cases: ' + event.feature.getProperty('positive') + '\n' +
          'Increase of positive cases: ' + event.feature.getProperty('positiveIncrease') + '\n' +
          'Total deaths: ' + event.feature.getProperty('death') + '\n'
        )
      })
    }
    window.initMap = initMap.bind(this);
  }

  changeDate(e) {
    const { date } = this.state
    if (e.keyCode === 37) {
      date.setDate(date.getDate() - 1);
      this.setState({
        date: date,
        formattedDate: '' + date.getFullYear() + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      })
    } 
    else if (e.keyCode === 39 && '' + date.getMonth() + date.getDate() !== '' + new Date().getMonth() + new Date().getDate()) {
      date.setDate(date.getDate() + 1);
      this.setState({
        date: date,
        formattedDate: '' + date.getFullYear() + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      })
    }
  } 

  render() {
    const { formattedDate } = this.state
    return (
      <div id='content' onKeyDown={this.changeDate}>
        <div id='date'>{formattedDate.slice(4,6) + '/' + formattedDate.slice(6,8) + '/' + formattedDate.slice(0,4)}</div>
        <div id="map"></div>
      </div>
    )
  }
};

export default App;