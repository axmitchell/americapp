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
          if (states) {
            let selState = states[feature.getProperty('stateId')]
            if (selState.positiveIncrease > 1000) {
              // stateColor = '#A91101'
              stateColor = '#1B4D3E'
            }
            if (selState.positiveIncrease < 1000 && selState.positiveIncrease > 100) {
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
        google.maps.event.clearListeners(map.data, 'click');
        map.data.addListener('click', (event) => {
          let selState = states[Number(event.feature.getProperty('stateId'))]
          alert(
            event.feature.getProperty('STUSPS')  + '\n' + 
            'Last Updated: ' + selState.lastUpdate + '\n' + 
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
    let newDate
    const { date } = this.state
    if (e.keyCode === 37) {
      newDate = new Date(date.setDate(date.getDate() - 1))
      console.log(newDate)
      this.setState({
        date: newDate,
        formattedDate: '' + newDate.getFullYear() + (newDate.getMonth() < 10 ? '0' + newDate.getMonth() : newDate.getMonth()) + (newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate())
      })
    } 
    else if (e.keyCode === 39 && '' + date.getMonth() + date.getDate() !== '' + new Date().getMonth() + new Date().getDate()) {
      newDate = new Date(date.setDate(date.getDate() + 1))
      console.log(newDate)
      this.setState({
        date: newDate,
        formattedDate: '' + newDate.getFullYear() + (newDate.getMonth() < 10 ? '0' + newDate.getMonth() : newDate.getMonth()) + (newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate())
      })
    }
  } 

  render() {
    const { formattedDate } = this.state
    return (
      <div id='content' onKeyDown={this.changeDate}>
        <div id='date'>{formattedDate.slice(4,6) + '/' + formattedDate.slice(6,8) + '/' + formattedDate.slice(0,4)}<br/><div id='title'>DAILY COVID UPDATES</div></div>
        <div id="map"></div>
        <div id="key">
          <table style={{width: '200px'}}>
            <tbody>
              <tr>
              <td className='keyIcon' style={{backgroundColor: '#1B4D3E'}}>&nbsp;</td>
              <td className='keyDescriptions'>1000+ cases</td>
              </tr>
              <tr>
              <td className='keyIcon' style={{backgroundColor: '#00693E'}}>&nbsp;</td>
              <td className='keyDescriptions'>100-999 cases;</td>
              </tr>
              <tr>
              <td className='keyIcon' style={{backgroundColor: '#018749'}}>&nbsp;</td>
              <td className='keyDescriptions'> 1-99 cases</td>
              </tr>
              <tr>
              <td className='keyIcon' style={{backgroundColor: '#3CB371'}}>&nbsp;</td>
              <td className='keyDescriptions'>0 cases</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
};

export default App;