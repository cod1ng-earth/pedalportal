import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
import filterResults from '../util/filterResults';

class Map extends Component {
  constructor (props) {
    super(props);
    this.state = {
      position: [this.props.center.lat, this.props.center.lng],
      zoom: 12
    }
  }
  
  render() {
    const markers = filterResults(this.props).map((el, index) => {
      return <Marker position={el.location} key={`${el.id}-${index}`}>
        <Popup>
          {el.name} <br />
          {el.tags.join(',')} <br />
          {el.location.address}
        </Popup>
      </Marker>
    });    

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
