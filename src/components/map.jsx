import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'

console.log(LeafletMap);

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
    const position2 = [52.520, 13.450]
    return (
      <LeafletMap center={position} zoom={this.state.zoom} id="mapid">
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Yeah. <br /> This is my first marker.
          </Popup>
        </Marker>

        <Marker position={position2}>
          <Popup>
            Another marker <br /> This is my second marker.
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default Map;
