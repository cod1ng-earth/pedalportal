import React, { Component } from 'react';
import { Container, Columns, Column } from 'bloomer';

import CardResult from './CardResult';

export default class CardResults extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <Container>
          <Columns>
            <Column isSize='1/3'>
              <CardResult {...this.props.results[0]} />
            </Column>
            <Column isSize='1/3'>
              <CardResult {...this.props.results[0]} />
            </Column>
            <Column isSize='1/3'>
              <CardResult {...this.props.results[0]} />
            </Column>

          </Columns>
        </Container>
      );
    }
}
  

