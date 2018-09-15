import React, { Component } from 'react';
import Sheet from '../demodata/sheet.json';
import { Container, Columns, Column, Box } from 'bloomer';
import Map from './map';
import MapFilter from './map_filter';

class MapBox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      lat: 52.520,
      lng: 13.405,
      zoom: 12,
    }
  }
  render() {
    return (
      <Box id="map_box_id">
        <Container>
          <Columns>
            <Column isSize='3/4'>
                <Map/>
            </Column>
            <Column isSize='1/4'>
                <MapFilter/>
            </Column>
          </Columns>
        </Container>
      </Box>
    );
  }
}

export default MapBox;
