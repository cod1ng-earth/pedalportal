import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
import Sheet from '../demodata/sheet.json';

class Map extends Component {
  constructor (props) {
    super(props);
    this.state = {
      lat: 52.520,
      lng: 13.405,
      zoom: 12,
    }
  }
  render() {
    const position = [this.state.lat, this.state.lng]
    const markers = Sheet.results.map((el, index) => (
      <Marker position={el.location} key={index}>
          <Popup>
            {el.name} <br />
            {el.tags.map((tag) =>
              `${tag}, `
            )}
          </Popup>
        </Marker>
      ));
    return (
      <LeafletMap center={position} zoom={this.state.zoom} id="mapid">
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </LeafletMap>
    );
  }
}

export default Map;
