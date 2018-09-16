import React, { Component } from 'react';
import { Container, Columns, Column } from 'bloomer';

import CardResult from './CardResult';
const _intersection = require('lodash.intersection');

export default class CardResults extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    const filters = Object.keys(this.props.filter);

    const filteredResults = filters.length > 0 ? this.props.result.filter(res => {
        return _intersection(filters, res.tags).length > 0
    }) : this.props.result

    const cards = filteredResults.map((el) => (
        <Column isSize='1/4'>
          <CardResult element = {el}/>
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


