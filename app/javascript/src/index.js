import React from 'react';
import ReactDOM from 'react-dom';
import Input from './UI/components/Input';
import mapboxgl from 'mapbox-gl';
import fetch from 'isomorphic-fetch';
import { drawPolygon, polygonCoordinates } from './UI/logic/polygon'
import calcNominalPower from './UI/logic/nominalPower'

import access from 'src/api_config'
mapboxgl.accessToken = access.token;

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [-71.0589, 42.36],
      center: [-71.0589, 42.36],
      geo_data: {}
    };
  }

  onAddressInput = (encodedAddress) => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${access.token}`)
    .then(response => response.json())
    .then(geo_json => {
      let coordinates = geo_json.features[0].geometry.coordinates;

      this.setState( (state, props) => ({
        geo_data: geo_json.features[0],
        coordinates: coordinates,
        center: coordinates,
        polygon: polygonCoordinates(coordinates) }) )
    })
    .catch(error => console.log(error) );
  }

  componentDidUpdate(prevProps, prevState){
    let map = this.state.map;

    // calculate size of solar array from polygonCoordinates
    let polygonArea
    if (typeof this.state.polygon != 'undefined') {
      if (prevState.polygon != this.state.polygon) {
        console.log(this.state.polygon);
        // area in square meters: https://turfjs.org/docs/#area 
        polygonArea =
        turf.area(
          turf.polygon([this.state.polygon]) );

        console.log("area: " + polygonArea); }
      //draw the polygon to map
      drawPolygon(map, this.state.polygon);
      // calculate the nominal solar rating
      let nominalPower =
      calcNominalPower(polygonArea, this.state.coordinates)
      console.log("nominalPower: " + nominalPower);

      this.setState({nominalPower: nominalPower});
    }
    // set the center of the map to the polygon coordinates center
    map.flyTo({
      center: this.state.coordinates,
      zoom: 15 });

  }

  componentDidMount() {
    let map =
    new mapboxgl
    .Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.state.center,
      zoom: 10 })

    map
    .on('load', () => {
      this.setState((state, props) => ({ map: map }) );
    });

    // map
    // .addControl(
    // new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   zoom: 14,
    //   placeholder: 'Enter search address',
    //   mapboxgl: mapboxgl }) ); {/*localGeocoder: (local storage?),*/}
  }

  render() {
    return (
        <div ref={element => this.mapContainer = element} className="mapContainer">
          <Input onAddressInput={this.onAddressInput}/>
        </div>
    )
  }
}

document.addEventListener("DOMContentLoaded", function(event){
  ReactDOM.render(<Application />, document.getElementById('app'));
});
