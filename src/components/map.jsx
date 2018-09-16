import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'

const _intersection = require('lodash.intersection');

class Map extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      position: [this.props.center.lat, this.props.center.lng],
      zoom: 12
    }

  }
  
  render() {
    const filters = Object.keys(this.props.filter);

    const filteredResults = filters.length > 0 ? this.props.result.filter(res => {
        return _intersection(filters, res.tags).length > 0
    }) : this.props.result

    const markers = 
      filteredResults.map((el, index) => {
        return <Marker position={{lat: el.lat, lng:el.lng}} key={el.id || 'sh-' + index}>
        <Popup>
          {el.name} <br />
          {el.tags.map((tag) => `${tag}, `)}
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
