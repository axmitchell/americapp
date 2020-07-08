import React from 'react';
import axios from 'axios';

const date = new Date()
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
      date: date,
      formattedDate: '' + date.getFullYear() + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    }
    this.changeDate = this.changeDate.bind(this)
    this.getStateInfo = this.getStateInfo.bind(this)
  }

  getStateInfo() {
    let states
    axios.get(`/data?date=${this.state.formattedDate}`)
      .then(res => {
        states = res.data
        this.setState({
          states: res.data
        });
        console.log('got state info')
      })
      .then(() => styleMap(states))
      .catch(console.log)
  }

  componentDidMount() {
    let states
    axios.get(`/data?date=${this.state.formattedDate}`)
      .then(res => {
        states = res.data
        this.setState({
          states: res.data
        });
        console.log('got state info')
      })
      .then(() => styleMap(states))
      .catch(console.log)
    const initMap = () => {
      console.log('initializing map')
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
      map.data.loadGeoJson(`http://localhost:3000/map`);
      global.styleMap = (states) => {
        console.log('adding style')
        map.data.setStyle(function(feature) {
          let stateColor
          if (states) {
            let selState = states[feature.getProperty('stateId')]
            if (selState.positiveIncrease > 1000) {
              stateColor = 'red'
            }
            if (selState.positiveIncrease < 1000 && selState.positiveIncrease > 100) {
              stateColor = 'orange'
            }
            if (selState.positiveIncrease < 100) {
              stateColor = 'yellow'
            }
            if (selState.positiveIncrease === 0) {
              stateColor = 'blue'
            }
          }
          else {
            stateColor = 'green'
          }
          return ({
            strokeColor: 'black',
            fillColor: stateColor,
            strokeWeight: 3,
            fillOpacity: 1
          });
        });
        //?????????????????
        google.maps.event.clearListeners(map.data, 'click');
        //?????????????????
        map.data.addListener('click', (event) => {
          let selState = states[Number(event.feature.getProperty('stateId'))]
          alert(
            event.feature.getProperty('STUSPS') + ": \n" + 
            'Total positive cases: ' + selState.positive + '\n' +
            'Increase of positive cases: ' + selState.positiveIncrease + '\n' +
            'Total deaths: ' + selState.death + '\n'
          )
        })
      }
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
    this.getStateInfo()
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