import React, { Component } from 'react';
import { Container, Columns, Column } from 'bloomer';

import CardResult from './CardResult';
import filterResults from '../util/filterResults';

export default class CardResults extends Component {

  render() {
    
    const cards = filterResults(this.props).map( (el,idx) => (
        <Column isSize='1/4' key={`cr-${idx}`}>
          <CardResult element={el}/>
        </Column>
      ));

    return (
      <Container>
        <Columns isMultiline>
        {cards}
        </Columns>
      </Container>
    );
  }
}


