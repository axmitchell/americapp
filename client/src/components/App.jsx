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
      date: date,
      formattedDate: formattedDate,
    }
    this.changeDate = this.changeDate.bind(this)
    this.getStateInfo = this.getStateInfo.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.date !== this.state.date) {
      this.getStateInfo()
    }
  }

  getStateInfo() {
    console.log(`getting state info for date: ${this.state.formattedDate}`)
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
    // let states
    // axios.get(`/data?date=${this.state.formattedDate}`)
    //   .then(res => {
    //     states = res.data
    //     this.setState({
    //       states: res.data
    //     });
    //     console.log('got state info')
    //   })
    //   .then(() => styleMap(states))
    //   .catch(console.log)
    this.getStateInfo();
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
      console.log(screen.width)
      console.log('initializing map')
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
      global.styleMap = (states) => {
        console.log('adding style')
        map.data.setStyle(function(feature) {
          let stateColor
          ////////////
          // console.log(states)
          // console.log(feature.getProperty('stateId'))
          // console.log(states[feature.getProperty('stateId')])
          let selState = states[feature.getProperty('stateId')]
          ////////////
          if (selState) {
            if (selState.positiveIncrease >= 1000) {
              // stateColor = '#A91101'
              stateColor = '#1B4D3E'
            }
            if (selState.positiveIncrease < 1000 && selState.positiveIncrease >= 100) {
              // stateColor = '#e4181e'
              stateColor = '#00693E'
            }
            if (selState.positiveIncrease < 100) {
              // stateColor = '#FF6347'
              stateColor = '#018749'
            }
            if (selState.positiveIncrease === 0) {
              // stateColor = '#F88379'
              stateColor = '#3CB371'
            }
          }
          else {
            stateColor = 'black'
          }
          return ({
            strokeColor: 'black',
            fillColor: stateColor,
            strokeWeight: 3,
            fillOpacity: 1
          });
        });
        window.onresize = function(e) {
          console.log(screen.width)
          // var currCenter = map.getCenter();
          google.maps.event.trigger(map, 'resize');
          // map.setCenter(currCenter);
        };
        // google.maps.event.clearListeners(map.data, 'click');
        // let exampleCoords = [{'lat': 31.34294, 'lng': -96.0957}, {'lat': 43.123, 'lng': -108.244}, {'lat': 40.737, 'lng': -77.462}]
        // exampleCoords.forEach(coord => {
        //   new google.maps.Marker({
        //     position: coord,
        //     map: map,
        //     icon: './images/covid.gif',
        //   });
        // })
        map.data.addListener('click', (event) => {
          /////////////////////
          let selState = states[Number(event.feature.getProperty('stateId'))]
          ////////////////////
          alert(
            selState.state  + '\n' + 
            'Increase of positive cases: ' + selState.positiveIncrease + '\n' +
            'Total positive cases: ' + selState.positive + '\n' +
            'Total deaths: ' + selState.death + '\n' +
            'State\'s Data Reporting Grade: ' + selState.dataQualityGrade + '\n' +
            'Last Updated: ' + selState.lastUpdateEt
          )
        })
      }
    }
    window.initMap = initMap.bind(this);
    // document.getElementById('content').focus()
    // console.log(document.activeElement)
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
      <div id='content' onKeyDown={this.changeDate}>
        <div id='date'>{formattedDate.slice(4,6) + '/' + formattedDate.slice(6,8) + '/' + formattedDate.slice(0,4)}<br/><div id='title'>DAILY COVID UPDATES</div></div>
        <div id="map"></div>
        <Key />
      </div>
    )
  }
};

export default App;