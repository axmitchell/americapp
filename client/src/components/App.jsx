import React from 'react';
import axios from 'axios';
import Key from './Key.jsx'

const date = new Date()
const formattedDate = '' + date.getFullYear() + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
      date: new Date(),
      formattedDate: formattedDate,
    }
    this.changeDate = this.changeDate.bind(this)
    this.getStateInfo = this.getStateInfo.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.date !== this.state.date) {
      this.getStateInfo(prepareMap)
    }
  }

  componentDidMount() {
    global.prepareMap = (states) => {
      map.data.setStyle(feature => {
        const currentState = states[feature.getProperty('stateId')]
        let stateColor = 'black';
        if (currentState) {
          const { positiveIncrease } = currentState;
          if (positiveIncrease >= 1000) {
            stateColor = '#1B4D3E'
          } else if (positiveIncrease < 1000 && positiveIncrease >= 100) {
            stateColor = '#00693E'
          } else if (positiveIncrease < 100) {
            stateColor = '#018749'
          } else if (positiveIncrease === 0) {
            stateColor = '#3CB371'
          }
        }
        return ({
          strokeColor: 'black',
          fillColor: stateColor,
          strokeWeight: 3,
          fillOpacity: 1
        });
      });
      window.onresize = e => {
        google.maps.event.trigger(map, 'resize');
      };
      google.maps.event.clearListeners(map.data, 'click');
      map.data.addListener('click', (event) => {
        let selectedState = states[Number(event.feature.getProperty('stateId'))]
        alert(
          selectedState.state  + '\n' + 
          'Increase of positive cases: ' + selectedState.positiveIncrease + '\n' +
          'Total positive cases: ' + selectedState.positive + '\n' +
          'Total deaths: ' + selectedState.death + '\n' +
          'State\'s Data Reporting Grade: ' + selectedState.dataQualityGrade + '\n' +
          'Last Updated: ' + selectedState.lastUpdateEt
        )
      })
    }
    this.getStateInfo(prepareMap);
    const initMap = () => {
      let zoom = 5
      if (screen.width <= 568) {
        zoom = 3.7
      } else if (screen.width <= 667) {
        zoom = 3.9
      } else if (screen.width <= 736) {
        zoom = 4.1
      } else if (screen.width <= 812) {
        zoom = 4
      } else if (screen.width <= 1024) {
        zoom = 4.6
      } else if (screen.width <= 1280) {
        zoom = 4.9
      } else if (screen.width <= 1440) {
        zoom = 5
      } else if (screen.width <= 1920) {
        zoom = 5.5
      }
      global.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.314599, lng: -96.139676},
        zoom: zoom,
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
      map.data.loadGeoJson(`http://localhost:3000/map`);
    }
    window.initMap = initMap.bind(this);
  }

  getStateInfo(cb) {
    let states
    axios.get(`/data?date=${this.state.formattedDate}`)
      .then(res => {
        states = res.data
        this.setState({
          states: res.data
        });
      })
      .then(() => cb(states))
      .catch(console.log)
  }

  changeDate(e) {
    let newDate
    const { date } = this.state
    if (e.keyCode === 37 && '' + date.getMonth() + date.getDate() !== '023') {
      newDate = new Date(date.setDate(date.getDate() - 1))
      console.log(newDate)
      this.setState({
        date: newDate,
        formattedDate: '' + newDate.getFullYear() + (newDate.getMonth() < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)) + (newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate())
      })
    } 
    else if (e.keyCode === 39 && '' + date.getMonth() + date.getDate() !== '' + new Date().getMonth() + new Date().getDate()) {
      newDate = new Date(date.setDate(date.getDate() + 1))
      console.log(newDate)
      this.setState({
        date: newDate,
        formattedDate: '' + newDate.getFullYear() + (newDate.getMonth() < 10 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)) + (newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate())
      })
    }
  } 

  render() {
    const { formattedDate } = this.state
    return (
      <div id='content' onKeyDown={this.changeDate} autoFocus>
        <div id='header'>
          <div id='date'>{formattedDate.slice(4,6) + '/' + formattedDate.slice(6,8) + '/' + formattedDate.slice(0,4)}</div>
          <div id='title'>DAILY COVID UPDATES</div>
        </div>
        <div id="map"></div>
        <Key />
      </div>
    )
  }
};

export default App;