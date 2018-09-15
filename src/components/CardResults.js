import React, { Component } from 'react';
import { Container } from 'bloomer';

import CardResult from './CardResult';

export default class CardResults extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <Container>
           <CardResult item={this.props.results[0]} />
        </Container>
      );
    }
}
  

