import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'

class Map extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      position: [this.props.center.lat, this.props.center.lng],
      zoom: 12
    }

  }
  
  render() {
    console.log("ding");

    const markers = this.props.result ?
      this.props.result.map((el, index) => (
      <Marker position={{lat: el.lat, lng:el.lng}} key={el.id || 'sh-' + index}>
          <Popup>
            {el.name} <br />
            {el.tags.map((tag) => `${tag}, `)}
          </Popup>
      </Marker>
      )) : '';
    return (
      <LeafletMap center={this.state.position} zoom={this.state.zoom} id="mapid">
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
