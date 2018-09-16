import React, { Component } from 'react';
import { Container, Columns, Column, Box } from 'bloomer';
import Map from './map';
import MapFilter from './map_filter';

class MapBox extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <Box id="map_box_id">
        <Container>
          <Columns>
            <Column isSize='3/4'>
                <Map {...this.props} center={{lat: 52.520, lng: 13.405}} />
            </Column>
            <Column isSize='1/4'>
                <MapFilter tags={this.props.tags} onFilter={this.props.onFilter} />
            </Column>
          </Columns>
        </Container>
      </Box>
    );
  }
}

export default MapBox;
