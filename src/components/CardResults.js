import React, { Component } from 'react';
import { Container, Columns, Column } from 'bloomer';

import CardResult from './CardResult';

export default class CardResults extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    //console.log(this.props.result.description);
    const cards = this.props.result.map((el) => (
        // console.log(el.name)
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


